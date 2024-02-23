import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { validateEmail, validatePassword, validateUserName } from "../../validations/validate";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../redux/slices/authenticationSlice";
import CryptoJS from 'crypto-js';
import { db } from "../../config/firebaseConfig";
import logo from "../../images/mava-white.png"
import "./style/style.css"

export default function SignUp() {
    const navigate = useNavigate();
    const users = useSelector((state) => state.auth.users);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [userExists, setUserExists] = useState(false);
    const [errorClsses, setErrorClasses] = useState({});
    const [passwordEye, setPasswordEye] = useState(false);
    const [signUpErrorsBlock, setSignUpErrorsBlock] = useState(true);
    const usersCollection = collection(db, 'users');
    let userExistsBool = true;
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    
    useEffect(() => {
        if (loggedIn && loggedIn === "ON") {
          navigate("/workspaces");
        }
    }, [loggedIn, navigate]);

    // useEffect(() => {
    //     const fetchusers = async () => {
    //       const snapshot = await getDocs(usersCollection)
    //       snapshot.docs.map((doc) => (dispatch(signUp({ ...doc.data() }))))
    //     }
    
    //     if (!users.length) fetchusers()
        
    // }, [users.length, usersCollection, dispatch])

    useEffect(() => {
        const uname = validateUserName(userName);
        const uemail = validateEmail(email);
        const upass = validatePassword(password);

        if (userName && uname !== "Success") {
            setErrors((prevErrors) => { return { ...prevErrors, "username": uname } });
            setErrorClasses((prevErrorClasses) => { return { ...prevErrorClasses, userNameError: "sign-up-input-error" } });
        } else {
            setErrors((prevErrors) => { return { ...prevErrors, "username": "" } });
            setErrorClasses((prevErrorClasses) => { return { ...prevErrorClasses, userNameError: "sign-up-valid-input" } });
        }

        if (email && uemail !== "Success") {
            setErrors((prevErrors) => { return { ...prevErrors, "email": uemail } });
            setErrorClasses((prevErrorClasses) => { return { ...prevErrorClasses, emailError: "sign-up-input-error" } });
        } else {
            setErrors((prevErrors) => { return { ...prevErrors, "email": "" } });
            setErrorClasses((prevErrorClasses) => { return { ...prevErrorClasses, emailError: "sign-up-valid-input" } });

        }

        if (password && Object.keys(upass).length) {
            setErrors((prevErrors) => { return { ...prevErrors, "password": upass } });
            setErrorClasses((prevErrorClasses) => { return { ...prevErrorClasses, passwordError: "sign-up-input-error" } });
        } else {
            setErrors((prevErrors) => { return { ...prevErrors, "password": "" } });
            setErrorClasses((prevErrorClasses) => { return { ...prevErrorClasses, passwordError: "sign-up-valid-input" } });
        }
        
    }, [userName, email, password]);

    const hashPassword = (password) => {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    };

    const handleSignUpFormOnsubmit = async (e) => {
        e.preventDefault();

        const usersCount = users.length;
        let id = 1;

        if (users && usersCount) {
            let lastUserId = users[usersCount - 1]["id"];
            id = lastUserId ? ++lastUserId: id;
        }

        if (!Object.values(errors).join("")) {

            users.forEach((item) => {

                if (item.email === email || item.userName === userName) {
                    userExistsBool = true;
                    setUserExists(() => true);
                } else {
                    userExistsBool = false;
                    setUserExists(() => false);
                }
            });

            if (!users.length || !userExistsBool) {
                dispatch(signUp({ id, userName, email, password: hashPassword(password) }));
                setErrors(() => "");
                setEmail(() => "");
                setUserName(() => "");
                setPassword(() => "");
                await addDoc(usersCollection, { id, userName, email, password: hashPassword(password) })
                navigate("/login");
            }
        }
    }

    const handleInputChange = (e) => {
        setUserExists(() => false)
        switch (e.target.name) {
            case "username":
                setUserName(() => e.target.value);
                break;
            case "email":
                setEmail(() => e.target.value);
                break;
            case "password":
                setPassword(() => e.target.value);
                break;
            default:
        }
    }

    const togglePasswordEye = () => {
        setPasswordEye((value) => !value);
    }

    const closeErrorsBlock = () => {
        if (Object.values(errors).join("") && signUpErrorsBlock)
            setSignUpErrorsBlock(() => false);
    }

    const openErrorsBlock = () => {
        if (Object.values(errors).join("") && !signUpErrorsBlock)
            setSignUpErrorsBlock(() => true);
    }

    return (
        <>
            <div className="st-logo">
                <a href="/">
                    <img src={logo} alt="mava" />
                </a>
            </div>
            <div className="sign-up-section" onClick={closeErrorsBlock}>
                <div className="sign-up-wrapper">
                    <div className="sign-up-block" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSignUpFormOnsubmit} autoComplete="off" className="auth-form">
                            <h2 className="auth-title">Sign Up</h2>
                            {
                                userExists && <div className="user-is-not-exists"><i className="fa-solid fa-ban not-exists-icon"></i> User is already exists</div>
                            }
                            <div className="username">
                                <label htmlFor="username" >User Name</label>
                                <input type="text" name="username" id="username" placeholder="User Name" className={userName && errorClsses.userNameError} value={userName} onChange={handleInputChange} onClick={openErrorsBlock}/>
                                <div className="errors-small">
                                    {
                                        errors?.username && <div className="username-errors error"><i className="fa-solid fa-circle-exclamation"></i> <p className="error-text">{errors?.username}</p></div>
                                    }
                                </div>
                            </div>
                            <div className="email">
                                <label htmlFor="email" >Email</label>
                                <input type="text" name="email" id="email" placeholder="Email" className={email && errorClsses.emailError} value={email} onChange={handleInputChange} onClick={openErrorsBlock}/>
                                <div className="errors-small">
                                    {
                                        errors?.email && <div className="email-errors error"><i className="fa-solid fa-circle-exclamation"></i> <p className="error-text">{errors?.email}</p></div>
                                    }
                                </div>
                            </div>
                            <div className="password">
                                <div className="pass-label-block">
                                    <label htmlFor="password" >Password</label>
                                    <div className={`password-block ${password && errorClsses.passwordError}`} onClick={openErrorsBlock}>
                                        <input type={passwordEye ? "text" : "password"} name="password" id="password" placeholder="Password" value={password} onChange={handleInputChange} autoComplete="off" />
                                        {
                                            password && <button className="password-eye" type="button" onClick={togglePasswordEye}><i className={passwordEye ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i></button>
                                        }
                                    </div>
                                </div>
                                <div className="errors-small">
                                    {
                                        errors?.password && 
                                        <div className="password-errors">
                                            <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                            <div className="password-errors-block">
                                                {
                                                    Object.entries(errors.password).map((err) => {
                                                        return <div className="error" key={err[0]}><p className="error-text">{err[1]}</p></div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <input type="submit" value="Sign Up" disabled={!userName || !email || !password || Object.values(errors).join("")} />
                            <p className="have-an-account">Have an account? <a href="/login">Sign In</a></p>
                        </form>
                    </div>
                    <div className="wrapper-block">
                        <div className="sign-up-info">
                            <h3 className="sign-up-info-title">Join the MAVA</h3>
                            <p className="sign-up-info-text">
                                It's your project, your way. Customize boards, views, and features to perfectly match your work style with MAVA.
                                Join the MAVA revolution today! Sign up FREE and unlock the path to organized, efficient, and successful projects.
                            </p>
                        </div>
                    { Object.values(errors).join("") && signUpErrorsBlock &&
                            <div className="sign-up-errors" onClick={(e) => e.stopPropagation()}>
                                {
                                    errors?.username && <div className="username-errors error"><i className="fa-solid fa-circle-exclamation"></i> <p className="error-text">{errors?.username}</p></div>
                                }
                                {
                                    errors?.email && <div className="email-errors error"><i className="fa-solid fa-circle-exclamation"></i> <p className="error-text">{errors?.email}</p></div>
                                }
                                {
                                    errors?.password && 
                                    <div className="password-errors">
                                        <i className="fa-solid fa-circle-exclamation error-icon"></i>
                                        <div className="password-errors-block">
                                            {
                                                Object.entries(errors.password).map((err) => {
                                                    return <div className="error" key={err[0]}><p className="error-text">{err[1]}</p></div>
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}