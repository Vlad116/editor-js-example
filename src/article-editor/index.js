import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// document.addEventListener("DOMContentLoaded", () => {
//   const buttonEl = document.querySelectorAll(".s-news-content-editor-call");
//   const el = document.querySelector("#article-editor");

//   if (!buttonEl.length) return;

//   eslint-disable-next-line react/jsx-filename-extension
//   ReactDOM.render(<App button={buttonEl} />, el);
// });
