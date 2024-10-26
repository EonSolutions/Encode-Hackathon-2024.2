"use client";
import React, { useState } from "react";
import "./Feedback.css";
import {
  generateKeys,
  encryptData,
  decryptData,
  hashFunc,
} from "../../lib/encrypt"; // Import RSA functions
import { getMethods } from "@/app/lib/flare/contract";
import { useContract } from "@/app/lib/ctx/contractctx";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  
  const contract = useContract();

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
      let docRef;
      if (feedback === decryptedFeedback) {
        console.log("Encryption and decryption successful!");

        // Step 4: Save encrypted feedback to Firebase
        const res = await fetch("/api/db/put", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            encryptedFeedback: encryptedFeedback,
          }),
        });
        const body = await res.json();
        docRef = body.id;
        console.log("Document written with ID: ", docRef);
      } else {
        console.log("Something went wrong with encryption or decryption.");
      }

      // Step 5: Prepare attestation request
      const res = await fetch("api/attest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data_id: docRef,
          data_hash: hashFunc(encryptedFeedback),
          model: "feedback",
          abi_signature: JSON.stringify({ signature: "abc" }),
        }),
      });

      const data = await res.json();

      console.log("STATUS ! STATUS ! ", res.status);
      console.log(data);

      // Reset feedback input
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
  };

  return (
    <div className="feedback-container">
      <h2>We Value Your Feedback</h2>
      <button onClick={async () => {
        console.log(await getMethods(contract));
      }}>Balls</button>
      <p>
        Your input is valuable in helping us better understand your needs and
        tailor our service accordingly.
      </p>
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
