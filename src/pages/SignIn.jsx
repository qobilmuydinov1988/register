import styles from "./auth.module.css";
import { useSignIn } from "../hooks/useSignin";
import { useState } from "react";
function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const { signInUser, loading } = useSignIn();

  function handleChangeValue(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  function handleSignin(e) {
    console.log({ email, password });
    e.preventDefault();
    signInUser(email, password);
    setUserInfo({ email: "", password: "" });
  }
  const isLoading = true;
  return (
    <div className={styles.box}>
      <h3>Sign In</h3>
      <form onSubmit={handleSignin}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChangeValue}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangeValue}
          />
        </label>
        {loading ? (
          <>
            <button disabled={isLoading}>Loading...</button>
          </>
        ) : (
          <>
            <button>Submit</button>
          </>
        )}
      </form>
    </div>
  );
}

export default SignIn;
