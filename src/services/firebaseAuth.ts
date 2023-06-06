import { GoogleAuthProvider,getAuth,signInWithPopup, UserCredential, signInWithEmailAndPassword } from "firebase/auth";

import { firebaseConfig } from "../firebaseConfig";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log({auth});


export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    console.log(res, "**********************");
    return res;
  } catch (err) {
    console.error(err);
    throw err
  }
};

export const normalSignIn =async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password)
  console.log(res);
  return res;
}
