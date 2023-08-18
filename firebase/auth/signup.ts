import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// Authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Sign up with email and password
const signUp = async (email: string, password: string) => {
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default signUp;
