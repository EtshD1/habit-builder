import { useCallback } from "react";
import { useState, useRef } from "react";

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
}: {
  value: string;
  setValue: Function;
}) => {
  const btn = useRef<HTMLButtonElement>(null);
  const ul = useRef<HTMLUListElement>(null);

  const [active, setActive] = useState(false);

  const categories = [
    { name: "Health", color: "#5B965E" },
    { name: "Hobby", color: "#4357AD" },
    { name: "Productivity", color: "#B80C09" },
  ];

  const chosen = categories.find((i) => i.name === value);

  const blur = () => {
    setTimeout(() => setActive(false), 150);
  };

  return (
    <div className={`dropdownContainer ${active ? "active" : ""}`}>
      <div>
        <button
          onBlur={blur}
          onClick={() => (active ? btn.current?.blur() : setActive(true))}
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

const Form = () => {
  const [formValues, setFormValues] = useState(intialFormValue);

  const controlledSetState = (item: {
    title?: string;
    description?: string;
    category?: string;
  }) => {
    setFormValues((ps) => ({ ...ps, ...item }));
  };

  return (
    <div id="formContainer">
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              className="title"
              type="text"
              placeholder="Title"
              onChange={(e) => controlledSetState({ title: e.target.value })}
              value={formValues.title}
            />
            <div className="hr"></div>
            <input
              className="description"
              type="text"
              placeholder="Description"
              onChange={(e) =>
                controlledSetState({ description: e.target.value })
              }
              value={formValues.description}
            />
            <div className="hr"></div>
            <Dropdown
              value={formValues.category}
              setValue={(category: string) => controlledSetState({ category })}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;