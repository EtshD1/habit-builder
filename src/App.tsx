import "./styles/main.scss";
import "./styles/reset.css";

import firebase from "firebase/app";
import config from "./firebase.json";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Form from "./components/AddTaskForm";
import Authenticate from "./components/Authenticate";

import { login, logout } from "./redux/actions";
import { storeType } from "./redux/reducers";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Context from "./context";

firebase.initializeApp(config);

const auth = firebase.auth();

const getTheme = () => {
  const value = window.localStorage.getItem("theme");
  if (value === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [form, showForm] = useState(false);
  const user = useSelector((state: storeType) => state.user);

  const dispatcher = useDispatch();

  useEffect(() => {
    setDarkTheme(getTheme());
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatcher(login(user));
      } else {
        dispatcher(logout());
      }
    })
  }, [dispatcher]);

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
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
