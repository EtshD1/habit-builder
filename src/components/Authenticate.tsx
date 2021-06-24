import { useContext } from "react";
import { useSelector } from "react-redux";

import Context from "../context";
import googleIcon from "./images/googleIcon.svg";
import { storeType } from "../redux/reducers";

const Authenticate = () => {
  const auths = useContext(Context);
  const user = useSelector((state: storeType) => state.user);

  return !user ? (
    <div className="login" onClick={auths.signIn}>
      <div>
        <img src={googleIcon} alt="Google" />
      </div>
      <div>Sign In</div>
    </div>
  ) : (
    <div className="logout" onClick={auths.signOut}>
      <svg
        width="36"
        height="34"
        viewBox="0 0 36 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow"
          d="M19 16C18.4477 16 18 16.4477 18 17C18 17.5523 18.4477 18 19 18V16ZM35.7071 17.7071C36.0976 17.3166 36.0976 16.6834 35.7071 16.2929L29.3431 9.92893C28.9526 9.53841 28.3195 9.53841 27.9289 9.92893C27.5384 10.3195 27.5384 10.9526 27.9289 11.3431L33.5858 17L27.9289 22.6569C27.5384 23.0474 27.5384 23.6805 27.9289 24.0711C28.3195 24.4616 28.9526 24.4616 29.3431 24.0711L35.7071 17.7071ZM19 18L35 18V16L19 16V18Z"
          fill="black"
        />
        <path
          d="M27 6V2H2V32H27V27.5"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Authenticate;
