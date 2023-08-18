import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

// Authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Sign in with email and password
const signIn = async (email: string, password: string) => {
  let result = null,
    error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default signIn;
