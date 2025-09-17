import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/SignIn";
import { auth } from "./firebase/firebase-config";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalcontext } from "./hooks/useGlobalcontext";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const { user, dispatch, readyAuth } = useGlobalcontext();
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(`onAuthStateChanged malumoti ${user}`);
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "AUTH_READY" });
    });
  }, []);
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: user ? <Home /> : null }, // 👈 user bo‘lmasa signin ga yo‘naltir
        ],
      },
      {
        path: "/signup",
        element: user ? <Navigate to={"/"} replace /> : <SignUp />,
      },
      {
        path: "/signin",
        element: user ? <Navigate to={"/"} replace /> : <SignIn />,
      },
      {
        path: "*", // 👈 fallback route
        element: <Navigate to="/" replace />,
      },
    ],
    {
      basename: "/sign-in-app", // GitHub repo nomi
    }
  );

  return <div>{readyAuth && <RouterProvider router={routes} />}</div>;
}

export default App;
