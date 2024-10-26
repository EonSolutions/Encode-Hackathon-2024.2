"use client";
import React, { useState } from "react";
import "./Feedback.css";
import { hashFunc } from "../../lib/encrypt";
import { getMethods } from "@/app/lib/flare/contract";
import { useContract } from "@/app/lib/ctx/contractctx";

export default function Feedback() {
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedback, setFeedback] = useState<number[]>([]);

  const contract = useContract();

  const handleSubmit = async () => {
    try {
      // Step 1-3: Encrypt feedback
      const res0 = await fetch("http://localhost:5001/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: feedback,
        }),
      });
      let encryptedFeedback = (await res0.json()).encrypted_feedback;

      // Check if the encryption and decryption worked
      let docRef;
      console.log("Encryption and decryption successful!");

      // Step 4: Save encrypted feedback to Firebase
      const res1 = await fetch("/api/db/put", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          encryptedFeedback: encryptedFeedback,
        }),
      });
      const body = await res1.json();
      docRef = body.id;
      console.log("Document written with ID: ", docRef);

      // Step 5: Prepare attestation request
      const res2 = await fetch("api/attest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data_id: docRef,
          data_hash: hashFunc(encryptedFeedback),
          model: "feedback",
          abi_signature: JSON.stringify({
            DataEntry: {
              encrypted_result: "string",
              encrypted_data: "string",
            },
          }),
        }),
      });

      const data = await res2.json();

      console.log("STATUS ! STATUS ! ", res2.status);
      console.log(data);

      // Reset feedback input
      setFeedback([]);
      setFeedbackInput("");
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
  };

  return (
    <div className="feedback-container">
      <h2>We Value Your Feedback</h2>
      <button
        onClick={async () => {
          console.log(await getMethods(contract));
        }}
      >
        Balls
      </button>
      <p>
        Your input is valuable in helping us better understand your needs and
        tailor our service accordingly.
      </p>
      <textarea
        className="feedback-input"
        placeholder="Write your feedback here..."
        value={feedbackInput}
        onChange={(e) => {
          setFeedback(e.target.value.split(",").map(Number));
          setFeedbackInput(e.target.value);
        }}
      />
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
}
