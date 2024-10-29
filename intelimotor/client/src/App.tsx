import React from "react";
import AdForm from "./components/AddForm";

export default function App(): React.ReactElement {
  return (
    <div
      style={{
        background: "#F3F4F6",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "6rem",
          background: "white",
        }}
      >
        <img
          src="/seminuevosHeader.jpeg"
          alt="Header Image"
          style={{
            margin: "0.7rem 6rem",
            height: "auto",
            maxHeight: "4rem",
          }}
        />
      </div>
      <AdForm />
    </div>
  );
}
