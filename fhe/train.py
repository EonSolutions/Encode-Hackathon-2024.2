from sklearn.decomposition import PCA
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import Pipeline
import pandas as pd
import os 
from concrete.ml.sklearn.xgb import XGBClassifier
from concrete.ml.deployment import FHEModelDev

df = pd.read_csv("health_data.csv")

labels = [
    "Stressed",
    "Not Stressed",
]

FHE_DIRECTORY = 'tmp/'

y_col = "label"

X = df.drop(y_col, axis=1)
y = df[y_col]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define our model
model = XGBClassifier(n_jobs=1, n_bits=3)

pipeline = Pipeline(
    [("model", model)]
)

# Define the parameters to tune
param_grid = {
    "model__max_depth": [2, 3, 5],
    "model__n_estimators": [5, 10, 20],
}

# Instantiate the grid search with 5-fold cross validation on all available cores
grid = GridSearchCV(pipeline, param_grid, cv=5, n_jobs=-1, scoring="accuracy")

# Launch the grid search
grid.fit(X_train, y_train)

print(f"X_train shape: {X_train.shape}")

print(f"Best parameters found: {grid.best_params_}")

best_pipeline = grid.best_estimator_

model = best_pipeline[0]

print(X_train.shape)
# Transform test set
X_train_transformed = X_train
X_test_transformed = X_test
print(X_train_transformed.shape)

# Evaluate the model on the test set in clear
y_pred_clear = model.predict(X_test_transformed)
print(f"Test accuracy in clear: {(y_pred_clear == y_test).mean():0.2f}")

model.compile(X_train_transformed)

N_TEST_FHE = 1
print(X_test_transformed[:N_TEST_FHE])
y_pred_fhe = model.predict(X_test_transformed[:N_TEST_FHE], fhe="execute")

print(f"{(y_pred_fhe == y_pred_clear[:N_TEST_FHE]).sum()} "
      f"examples over {N_TEST_FHE} have an FHE inference equal to the clear inference.")


print(f"Prediction: {labels[y_pred_fhe[0]]}")


def delete_directory_recursively(directory):
    for root, dirs, files in os.walk(directory, topdown=False):
        for name in files:
            os.remove(os.path.join(root, name))
        for name in dirs:
            os.rmdir(os.path.join(root, name))
    os.rmdir(directory)

# Setup the development environment

if os.path.exists(FHE_DIRECTORY):
    # Delete the directory recursively if it already exists
    delete_directory_recursively(FHE_DIRECTORY)

dev = FHEModelDev(path_dir=FHE_DIRECTORY, model=model)
dev.save()

