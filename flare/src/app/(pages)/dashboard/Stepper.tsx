import React from "react";
import styles from "./stepper.module.scss";

type StepperProps = {
    steps: {
        label: string;
        inProgressDescription: string;
        completedDescription: string;
    }[];
    activeStep: number;
}

const Stepper = ({ steps = [], activeStep }: StepperProps) => (
    <div className={styles.stepper}>
        <h2>Processing Data</h2>
        <div className={styles.stepsList}>
            {steps.length > 0 ? (
                steps.map((step, index) => (
                    <div key={index} className={`${styles.step} ${index < activeStep ? styles.completed : index === activeStep ? styles.inProgress : styles.pending}`}>
                        <div className={styles.stepIndicator}>
                            {index < activeStep ? "✔" : index + 1}
                        </div>
                        <div className={styles.stepContent}>
                            <p className={styles.stepLabel}>{step.label}</p>
                            <p className={styles.stepDescription}>
                                {index < activeStep ? step.completedDescription : step.inProgressDescription}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading steps...</p> // Fallback for empty steps array
            )}
        </div>
    </div>
);

export default Stepper;
