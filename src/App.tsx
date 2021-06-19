import "./styles/main.scss";
import "./styles/reset.css";

import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Form from "./components/AddTaskForm";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import config from "./firebase.json";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

firebase.initializeApp(config);

const auth = firebase.auth();
const firestore = firebase.firestore();

const getTheme = () => {
  const value = window.localStorage.getItem("theme");
  console.log(value);
  if (value === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

const signOut = () => auth.signOut();

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [form, showForm] = useState(false);

  const [user] = useAuthState(auth);
  console.log(user);

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
      {user ? (
        <Body add={() => showForm(true)} />
      ) : (
        <div id="signInBody">
          <div>Sign In</div>
        </div>
      )}
      {form ? <Form close={() => showForm(false)} /> : ""}
    </div>
  );
};

export default App;
