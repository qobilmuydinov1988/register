import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import GlobalcontextProvider from "./context/GlobalContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <GlobalcontextProvider>
      <Toaster position="top-center" richColors />

      <App />
    </GlobalcontextProvider>
  </>
);
