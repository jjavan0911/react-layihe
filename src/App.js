import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Section1 from "./Components/Main1/Section1";
import Section2 from "./Components/Main1/Section2";
import Main2Section1 from "./Components/Main2/Main2Section1";
import NotFound from "./Components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark"); 

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  return (
    <>
      <div className="themeToggle">
        <button onClick={toggleTheme}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="mainLayout">
              <Section1 />
              <Section2 />
            </div>
          }
        />
        <Route path="/GoToFavoriteList/:id" element={<Main2Section1 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </>
  );
}

export default App;
