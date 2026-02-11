import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import App from "./App";

const publicUrl = process.env.PUBLIC_URL || "";
document.documentElement.style.setProperty("--testimonial-quote-active", `url('${publicUrl}/assets/quoteactive.svg')`);
document.documentElement.style.setProperty("--testimonial-quote-blue", `url('${publicUrl}/assets/quoteblue.svg')`);

const container = document.getElementById("root");

createRoot(container).render(
  <HelmetProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL || "/ACHI-IT"}>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
