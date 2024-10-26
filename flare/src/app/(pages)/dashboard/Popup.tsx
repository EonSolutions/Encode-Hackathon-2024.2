import React from "react";
import styles from "./popup.module.scss";

const Popup = ({ onClose, onFileUpload }) => {
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target.result);
                    onFileUpload(parsedData);
                } catch (error) {
                    alert("Invalid JSON file. Please upload a valid healthcare data JSON file.");
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popupContainer}>
                <h2 className={styles.popupTitle}>Healthcare Data Upload</h2>
                <p className={styles.popupText}>Please upload a JSON file containing your healthcare data to continue.</p>
                <div className={styles.buttonsContainer}>
                    <label className={styles.uploadButton}>
                        <input type="file" accept=".json" onChange={handleFileChange} style={{ display: 'none' }} />
                        Upload Data
                    </label>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
