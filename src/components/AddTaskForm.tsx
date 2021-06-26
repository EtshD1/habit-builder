import React, { useEffect } from "react";
import { useState, useRef } from "react";
import categories from "../categories";
import firebase from 'firebase/app';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { storeType } from '../redux/reducers';

type habitValues = {
  title: string;
  description: string;
  category: string;
};

const intialFormValue: habitValues = {
  title: "",
  description: "",
  category: "",
};

const Dropdown = ({
  value,
  setValue,
  warning,
}: {
  value: string;
  setValue: Function;
  warning: string;
}) => {
  const btn = useRef<HTMLButtonElement>(null);
  const ul = useRef<HTMLUListElement>(null);

  const [active, setActive] = useState(false);

  const chosen = categories.find((i) => i.name === value);

  const blur = () => {
    setTimeout(() => setActive(false), 150);
  };

  return (
    <div
      className={`dropdownContainer ${active ? "active" : ""} ${warning ? "warn" : ""
        }`}
    >
      <div className="warningContainer">
        <div className="warningMsg">{warning}</div>
      </div>
      <div>
        <button
          onBlur={blur}
          onClick={(e) => {
            e.preventDefault();
            active ? btn.current?.blur() : setActive(true);
          }}
          ref={btn}
          className="dropdownBtn"
        >
          {chosen ? (
            <div style={{ color: chosen.color }}>{chosen.name}</div>
          ) : (
            <div>Category</div>
          )}
          <div className="arrow">
            <svg
              width="24"
              height="14"
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97919 22.6066 1.3934C22.0208 0.807611 21.0711 0.807611 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807611 1.97919 0.807611 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 10V12H13.5V10H10.5Z"
                fill="black"
              />
            </svg>
          </div>
        </button>
        <ul className="dropdownList" ref={ul} onBlur={blur}>
          {categories.map((i) => (
            <li
              key={i.name}
              onClick={() => (active ? setValue(i.name) : null)}
              style={{
                color: i.color,
              }}
            >
              {i.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Field = ({
  value,
  setValue,
  className,
  placeholder,
  warning,
}: {
  value: string;
  setValue: Function;
  className: string;
  placeholder: string;
  warning: string;
}) => {
  return (
    <div className={`field ${warning ? "warn" : ""}`}>
      <div className="warningContainer">
        <div className="warningMsg">{warning}</div>
      </div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        {...{ value, className, placeholder }}
      />
      <div className="hr"></div>
    </div>
  );
};

const Form = ({ close }: { close: Function }) => {
  const [values, setValues] = useState(intialFormValue);
  const [warnings, setWarnings] = useState(intialFormValue);
  const [active, setActive] = useState(true);

  const user = useSelector((state: storeType) => state.user);

  const db = useMemo(() => firebase.firestore(), []);

  const controlledSetState = (item: {
    title?: string;
    description?: string;
    category?: string;
  }) => {
    setValues((ps) => ({ ...ps, ...item }));
  };

  const submit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    let submittable = true;
    if (values.title === "") {
      setWarnings((ps) => ({ ...ps, title: "Please Enter a Title" }));
      submittable = false;
    }
    if (values.description === "") {
      setWarnings((ps) => ({
        ...ps,
        description: "Please Enter a Description",
      }));
      submittable = false;
    }
    if (values.category === "") {
      setWarnings((ps) => ({ ...ps, category: "Please Select a Category" }));
      submittable = false;
    }
    if (submittable) {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      await db.collection("habits").add(
        { ...values, createdAt: serverTimestamp(), uid: user?.uid, completed: [] }
      );
      setActive(false);
    }
  };

  useEffect(() => {
    if (!active) {
      setTimeout(() => close(), 300);
    }
  }, [active, close]);

  return (
    <div
      id="formContainer"
      className={active ? "active" : ""}
      onClick={() => setActive(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submit}>
          <div>
            <Field
              className="title"
              placeholder="Title"
              value={values.title}
              warning={warnings.title}
              setValue={(title: string) => {
                controlledSetState({ title });
                setWarnings((ps) => ({ ...ps, title: "" }));
              }}
            />
            <Field
              className="description"
              placeholder="Description"
              value={values.description}
              warning={warnings.description}
              setValue={(description: string) => {
                controlledSetState({ description });
                setWarnings((ps) => ({ ...ps, description: "" }));
              }}
            />
            <Dropdown
              warning={warnings.category}
              value={values.category}
              setValue={(category: string) => {
                controlledSetState({ category });
                setWarnings((ps) => ({ ...ps, category: "" }));
              }}
            />
            <div className="submission">
              <button onClick={() => setActive(false)}>Cancel</button>
              <input type="submit" value="Save" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
