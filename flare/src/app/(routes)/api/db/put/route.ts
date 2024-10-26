import {addDoc, collection} from "firebase/firestore";
import {db} from "@/lib/firebaseConfig";

export async function POST(req: Request) {
    const body = await req.json();
    const encryptedFeedback = body.encryptedFeedback;
    const docRef = await addDoc(collection(db, "feedbacks"), {
        encryptedFeedback: encryptedFeedback,
        timestamp: new Date(),
    });

    return Response.json({ id: docRef.id });
}
