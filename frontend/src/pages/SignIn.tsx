import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import config from "../../../config.js";

// components
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import NavBar from "@/components/NavBar";
import { setGlobalState, useGlobalState } from "@/state/global";

interface TextboxProps {
  label: string;
  placeholder: string;
  type: string;
  ref: { current: HTMLInputElement | null };
}

const RememberForgotSection = () => {
  return (
    <div
      id="sign remember forgot container"
      className="w-full flex flex-row justify-end items-center"
    >
      <Link
        to="/ConfirmEmail"
        id="sign forgot text"
        className="text-lg hover:text-primary transition-all ease-in duration-250"
      >
        Forgot password?
      </Link>
    </div>
  );
};

const SignSwapSection = () => {
  const link = "/sign-up";
  const text = "Don't have an account?";
  const button = "Sign Up";
  return (
    <span
      id="sign signup container"
      className="flex align-middle justify-center"
    >
      <Link to={link} id="signSwap text" className="text-lg justify-self-end">
        {text}
      </Link>
      <Link to={link} id="signSwap button" className="text-lg font-bold pl-2">
        {button}
      </Link>
    </span>
  );
};

export default function SigninPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberRef = useRef<HTMLInputElement>(null);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [user] = useGlobalState("user");
  const [org] = useGlobalState("org");

  const invalidCredentials: boolean[] = [invalidEmail, invalidPassword];
  const navigate = useNavigate();

  const textboxes: TextboxProps[] = [
    {
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      ref: emailRef,
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      ref: passwordRef,
    },
  ];

  const errorMessages: JSX.Element[] = [
    <p className="text-error self-start">Email not recognized!</p>,
    <p className="text-error self-start">Incorrect password!</p>,
  ];

  const loginOnClick = () => {
    console.log("Login button clicked");
    if (emailRef.current && passwordRef.current) {
      console.log(
        `Received Username: ${emailRef.current.value} and Password: ${passwordRef.current.value}`
      );
      if (rememberRef.current) {
        console.log(`Remember me: ${rememberRef.current.checked}`);
      }

      // Send login request to backend
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      fetch(
        `http://${config.hostname}/signIn?email=${email}&password=${password}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 0) {
            console.log(JSON.stringify(data));
            // Update global state and localStorage
            setGlobalState("user", {
              ...user,
              manager: data.manager,
              uid: String(data.user.uid),
              email: data.user.email,
              firstName: data.user.firstname,
              lastName: data.user.lastname,
            });
            setGlobalState("org", { ...org, oid: String(data.user.oid) });
            localStorage.setItem("uid", String(data.user.uid));
            localStorage.setItem("firstName", data.user.firstname);
            localStorage.setItem("lastName", data.user.lastname);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("manager", data.manager);
            localStorage.setItem("oid", String(data.user.oid));
            localStorage.setItem("notifications", data.user.notifications);
            navigate("/dashboard");
          } else if (data.status === 1) {
            setInvalidEmail(true);
            setInvalidPassword(false);
          } else {
            // Valid email, incorrect password
            setInvalidEmail(false);
            setInvalidPassword(true);
          }
        });
    }
  };

  return (
    <div className="px-4 md:px-8 h-screen flex flex-col">
      <NavBar className="mt-4 lg:col-span-2" hideButton={true} />
      <div className="flex-grow grid lg:grid-cols-2 place-items-center gap-x-32">
        <div
          id="sign container"
          className="flex flex-row flex-wrap justify-center items-center col-start-1"
        >
          <div
            id="sign content container"
            className="flex flex-col justify-center items-center gap-4 md:gap-8"
          >
            <p
              id="sign content header"
              className="text-4xl md:text-6xl font-bold text-center whitespace-nowrap"
            >
              Welcome Back!
            </p>
            <p id="sign content text" className="text-lg text-center">
              Unite to foster an environment where creativity, collaboration,
              and mutual respect flourish
            </p>
            {textboxes.map((textbox, index) => (
              <div key={index} className="w-full">
                <TextBox
                  id={textbox.label}
                  key={index}
                  textRef={textbox.ref}
                  label={textbox.label}
                  placeholder={textbox.placeholder}
                  type={textbox.type}
                />
                {/* Display appropriate error message if applicable */}
                {invalidCredentials[index] ? errorMessages[index] : null}
              </div>
            ))}
            <RememberForgotSection />
            <Button
              id="Sign in"
              label="Sign in"
              style="btn-secondary w-full"
              onClick={loginOnClick}
              navigate={false}
            />
            <SignSwapSection />
          </div>
        </div>
        <div className="h-full col-start-2 hidden lg:flex">
          <img
            alt="Sign Up Illustration"
            src="sign_in_up.svg"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
