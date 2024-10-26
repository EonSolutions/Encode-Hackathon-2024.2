"use client";
import React, { useState } from "react";
import "./Feedback.css";
import { generateKeys, encryptData, decryptData } from "../../../../backend/encrypt"; // Import RSA functions

export default function Feedback() {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        // Step 1: Generate RSA keys
        const { publicKey, privateKey } = generateKeys();

        // Step 2: Encrypt the feedback using the public key
        const encryptedFeedback = encryptData(feedback, publicKey);
        console.log("Encrypted Feedback:", encryptedFeedback);

        // Step 3: Decrypt the feedback using the private key
        const decryptedFeedback = decryptData(encryptedFeedback, privateKey);
        console.log("Decrypted Feedback:", decryptedFeedback);

        // Check if the encryption and decryption worked
        if (feedback === decryptedFeedback) {
            console.log("Encryption and decryption successful!");
        } else {
            console.log("Something went wrong with encryption or decryption.");
        }

        // Reset feedback input
        setFeedback("");
    };

    return (
        <div className="feedback-container">
            <h2>We Value Your Feedback</h2>
            <p>Your input is valuable in helping us better understand your needs and tailor our service accordingly.</p>
            <textarea
                className="feedback-input"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />
            <button className="submit-btn" onClick={handleSubmit}>
                Submit Feedback
            </button>
        </div>
    );
}
