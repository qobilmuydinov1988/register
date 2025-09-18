import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import GlobalContextProvider from "./context/globalContext.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    <Toaster position="top-center" richColors />
  </>
);
