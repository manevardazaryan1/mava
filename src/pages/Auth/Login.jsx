import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/authenticationSlice";
import CryptoJS from "crypto-js";
import { signUp } from "../../redux/slices/authenticationSlice";
import { db } from "../../config/firebaseConfig";
import logo from "../../images/mava-white.png"
import "./style/style.css"

export default function Login() {
  const navigate = useNavigate();
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const [passwordEye, setPasswordEye] = useState(false);

  useEffect(() => {
    if (loggedIn && loggedIn === "ON") {
      navigate("/workspaces");
    }
  }, [loggedIn, navigate]);

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userIsNotExists, setUserIsNotExists] = useState(false);
  const usersCollection = collection(db, 'users');

  useEffect(() => {
    const fetchusers = async () => {
      const snapshot = await getDocs(usersCollection)
      snapshot.docs.map((doc) => (dispatch(signUp({ ...doc.data() }))))
    }

    if (!users.length) fetchusers()
    
  }, [users.length, usersCollection, dispatch])

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(() => e.target.value);
        break;
      case "password":
        setPassword(() => e.target.value);
        break;
      default:
    }
  };

  const handleLoginForm = (e) => {
    e.preventDefault();

    for (const user of users) {
      if (
        user.email === email &&
        user.password === CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
      ) {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
        dispatch(login(user));
        navigate("/workspaces");
        setUserIsNotExists(() => false);
      }
    }
    setUserIsNotExists(() => true)
  };

  const togglePasswordEye = () => {
    setPasswordEye((value) => !value);
  };

  return (
    <>
      <div className="st-logo">
      <a href="/">
          <img src={logo} alt="AMMA-Track" />
      </a>
      </div>
      <div className="login-section">
        <form autoComplete="off" onSubmit={handleLoginForm} className="auth-form">
          <h2 className="auth-title">Sign In</h2>
          {
            userIsNotExists && (
            <div className="user-is-not-exists"><i className="fa-solid fa-ban not-exists-icon"></i>User isn't exists</div>
          )}
          <div>
            <label htmlFor="email" className="floating-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <div className="pass-label-block">
              <label htmlFor="password">Password</label>
              <div className="password-block">
                <input
                  type={passwordEye ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="false"
                  onChange={handleInputChange}
                />
                {password && (
                  <button
                    className="password-eye"
                    type="button"
                    onClick={togglePasswordEye}
                  >
                    <i
                      className={
                        passwordEye ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                      }
                    ></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          <input type="submit" value="Sign In" disabled={!email || !password} />
          <p className="dont-have-an-account">Dont have an account? <a href="/sign-up">Sign Up</a></p>
        </form>
      </div>
    </>
  );
}
