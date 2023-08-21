import { createRoot } from "react-dom/client";

import App from "./components/app";

const root = createRoot(document.querySelector(".todoapp"));
root.render(<App />);
