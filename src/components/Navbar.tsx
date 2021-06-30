import { MouseEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../redux/reducers";
import Authenticate from "./Authenticate";

type toggleFunction = MouseEventHandler<HTMLLIElement>;

const Logo = () => {
  return (
    <li className="nav-brand">
      <h3>Habit Builder</h3>
    </li>
  );
};

const NavElements = ({ changeTheme }: { changeTheme: Function }) => {
  const user = useSelector((state: storeType) => state.user);
  return (
    <li className="nav-elements">
      <ul>
        <li onClick={() => changeTheme()}>Theme</li>
        <li className={`userArea ${user ? "loggedIn" : ""}`}>
          {user ? (
            <div>
              <div className="welcome">Hello,</div>{" "}
              <div className="username">{user.displayName}</div>
            </div>
          ) : (
            ""
          )}
          <li>
            <Authenticate />
          </li>
        </li>
      </ul>
    </li>
  );
};

const Burger = ({ toggle }: { toggle: toggleFunction }) => {
  return (
    <li className="burger-menu" onClick={toggle}>
      <div></div>
      <div></div>
      <div></div>
    </li>
  );
};

const Sidebar = (props: {
  active: boolean;
  toggle: Function;
  changeTheme: Function;
}) => {
  const { active, toggle, changeTheme } = props;
  return (
    <div
      id="sidebar"
      className={active ? "active" : ""}
      onClick={(e) => toggle()}
    >
      <ul onClick={(e) => e.stopPropagation()}>
        <li onClick={() => changeTheme()}>Theme</li>
        <Authenticate />
      </ul>
    </div>
  );
};

const Navbar = ({ changeTheme }: { changeTheme: Function }) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => setSidebarActive((ps) => !ps);

  return (
    <>
      <header className="nav-bar">
        <nav>
          <ul>
            <Logo />
            <NavElements {...{ changeTheme }} />
            <Burger toggle={toggleSidebar} />
          </ul>
        </nav>
      </header>
      <Sidebar
        active={sidebarActive}
        toggle={toggleSidebar}
        {...{ changeTheme }}
      />
    </>
  );
};

export default Navbar;
