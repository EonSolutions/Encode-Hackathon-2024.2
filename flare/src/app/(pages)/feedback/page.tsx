"use client";
import React, { useState } from "react";
import "./Feedback.css";
import { generateKeys, encryptData, decryptData } from "../../../lib/encrypt"; // Import RSA functions
import { db } from "../../../lib/firebaseConfig"; // Firebase config
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore functions

export default function Feedback() {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async () => {
        try {
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

                // Step 4: Save encrypted feedback to Firebase
                const docRef = await addDoc(collection(db, "feedbacks"), {
                    encryptedFeedback: encryptedFeedback,
                    timestamp: new Date(),
                });
                console.log("Document written with ID: ", docRef.id);
            } else {
                console.log("Something went wrong with encryption or decryption.");
            }

            // Reset feedback input
            setFeedback("");
        } catch (error) {
            console.error("Error submitting feedback: ", error);
        }
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