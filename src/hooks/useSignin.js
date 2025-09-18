/*import { auth } from "../firebase/firebase-config";*/
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config.js";
import { useGlobalcontext } from "./useGlobalcontext.js";
import { useState } from "react";
import { toast } from "sonner";
export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useGlobalcontext();

  const signInUser = (email, password) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { signInUser, loading };
}
