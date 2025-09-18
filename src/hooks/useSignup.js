/*import { auth } from "../firebase/firebase-config";*/
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config.js";
import { useGlobalcontext } from "./useGlobalcontext.js";
import { useState } from "react";
import { toast } from "sonner";
export function useSignup() {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useGlobalcontext();

  const signUpUser = (userName, email, password) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: userName,
        });

        dispatch({ type: "PROFILE", payload: user.displayName });
        toast.message("Profile update");

        console.log(user);
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
  return { signUpUser, loading };
}
