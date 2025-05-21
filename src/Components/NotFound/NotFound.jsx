import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <NavLink to="/" className="back-home">
        ⬅ Back to Home
      </NavLink>
    </div>
  );
}
