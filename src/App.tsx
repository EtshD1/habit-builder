import "./styles/main.scss";
import "./styles/reset.css";

import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Form from "./components/AddTaskForm";
import Authenticate from "./components/Authenticate";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import config from "./firebase.json";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import Context from "./Context";

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

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [form, showForm] = useState(false);

  const [user] = useAuthState(auth);
  console.log(user);

  useEffect(() => {
    setDarkTheme(getTheme());
  }, []);

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await auth.signInWithPopup(provider);
    console.log(user);
  };

  const signOut = () => {
    auth.signOut();
  };

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
    <Context.Provider value={{ signIn, signOut }}>
      <div className={`App ${darkTheme ? "dark" : ""}`}>
        <Navbar {...{ changeTheme }} />
        {user ? (
          <Body add={() => showForm(true)} />
        ) : (
          <div id="signInBody">
            <Authenticate />
          </div>
        )}
        {form ? <Form close={() => showForm(false)} /> : ""}
      </div>
    </Context.Provider>
  );
};

export default App;
