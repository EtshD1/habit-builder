import "./styles/main.scss";
import "./styles/reset.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Form from "./components/AddTaskForm";
import { useState, useEffect } from "react";

const getTheme = () => {
  const value = window.localStorage.getItem("theme");
  console.log(value);
  if (value === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    setDarkTheme(getTheme());
  }, []);

  const changeTheme = () => {
    setDarkTheme((ps) => {
      if (ps) {
        window.localStorage.setItem("theme", "light");
      } else {
        window.localStorage.setItem("theme", "dark");
      }
      return !ps;
    });
  };

  return (
    <div className={`App ${darkTheme ? "dark" : ""}`}>
      <Navbar {...{ changeTheme }} />
      <Body />
      <Form />
    </div>
  );
};

export default App;
