import "./Header.css";

import { Button } from "../Button/Button";

import mavaLogoWhite from "../../images/mava-white.png";
import mavaLogo from "../../images/mava-logo.png";

import { useDispatch, useSelector } from "react-redux";
import { deleteActiveWorkspace, closeSettings } from "../../redux/slices/workspacesSlice";

import { boardCreationBoxHandle, workspaceCreationBoxHandle } from "../../redux/slices/creationBoxSlice";

import { Link } from "react-router-dom";

export const Header = ({ type }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  let buttons;
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const dispatch = useDispatch();
  if (!loggedIn) {
    buttons = (
      <>
        <Link to="/login">
          <Button type="main">Sign In</Button>
        </Link>
      </>
    );
  } else {
    const userAvatar =
      loggedUser && loggedUser.userName
        ? loggedUser.userName[0].toUpperCase()
        : "";
    buttons = (
      <>
        <Link to="/account">
          <Button onClick={() => { dispatch(closeSettings()); dispatch(boardCreationBoxHandle({ val: false })); dispatch(workspaceCreationBoxHandle({ val: false })) }} type="account-btn">{userAvatar}</Button>
        </Link>
        <Link to="/log-out">
          <Button
            onClick={() => { dispatch(closeSettings()); dispatch(deleteActiveWorkspace({})); dispatch(boardCreationBoxHandle({ val: false })); dispatch(workspaceCreationBoxHandle({ val: false })) }}
            type="secondary"
          >
            Sign Out
          </Button>
        </Link>
      </>
    );
  }

  return (
    <div className={`header ${type}`}>
      <div className="container">
        <div className="header-wrapper">
          <Link to={`${loggedIn ? "/workspaces" : "/"}`}>
            <img src={type === "on-light"?  mavaLogo: mavaLogoWhite} alt="logo" className="logo"/>
          </Link>
          <div className="header-buttons">{buttons}</div>
        </div>
      </div>
    </div>
  );
};
