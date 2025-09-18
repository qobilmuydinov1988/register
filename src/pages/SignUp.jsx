import { useState } from "react";
import styles from "./auth.module.css";
import { useSignup } from "../hooks/useSignup.js";
function SignUp() {
  const isLoading = false;
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signUpUser, loading } = useSignup();

  function handleChangeValue(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  const { name, email, password } = userInfo;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userInfo);
    signUpUser(name, email, password);
    setUserInfo({ name: "", email: "", password: "" });
  }

  return (
    <div>
      <div className={styles.box}>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>User Name:</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChangeValue}
            />
          </label>
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
              type="text"
              name="password"
              value={password}
              onChange={handleChangeValue}
            />
          </label>
          {loading ? (
            <>
              <button disabled={loading}>Loading...</button>
            </>
          ) : (
            <>
              <button>Submit</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
