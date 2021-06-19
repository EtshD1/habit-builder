import { MouseEventHandler, useState } from "react";

type toggleFunction = MouseEventHandler<HTMLLIElement>;

const Logo = () => {
  return (
    <li className="nav-brand">
      <h3>Habit Builder</h3>
    </li>
  );
};

const NavElements = ({ changeTheme }: { changeTheme: Function }) => {
  return (
    <li className="nav-elements">
      <ul>
        <li onClick={() => changeTheme()}>Theme</li>
        <li>Sign In</li>
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

const Sidebar = (props: { active: boolean; toggle: Function }) => {
  const { active, toggle } = props;
  return (
    <div
      id="sidebar"
      className={active ? "active" : ""}
      onClick={(e) => toggle()}
    >
      <ul onClick={(e) => e.stopPropagation()}>
        <li>Theme</li>
        <li>Sign In</li>
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
      <Sidebar active={sidebarActive} toggle={toggleSidebar} />
    </>
  );
};

export default Navbar;
