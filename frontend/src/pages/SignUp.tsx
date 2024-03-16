import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
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

export default function SignUpPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [user] = useGlobalState("user");
  const [org] = useGlobalState("org");

  const textboxes: TextboxProps[] = [
    {
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      ref: emailRef,
    },
    {
      label: "Retype Email",
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
      fetch(`http://${config.hostname}/signUp`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Internal Error");
          } else {
            // Signed up successfully
            window.alert("Account successfully created!");
            return res.json();
          }
        })
        .then((data) => {
          // Update global state and localStorage (oid is 0 since user has not joined organization on sign up)
          setGlobalState("user", {
            ...user,
            manager: false,
            uid: String(data.user.uid),
            firstName: data.user.firstname,
            lastName: data.user.lastname,
          });
          setGlobalState("org", { ...org, oid: "0" });
          localStorage.setItem("uid", String(data.user.uid));
          localStorage.setItem("firstName", data.user.firstname);
          localStorage.setItem("lastName", data.user.lastname);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("manager", "false");
          localStorage.setItem("oid", "0");
          localStorage.setItem("notifications", "false");
          navigate("/dashboard");
        });
    }
  };

  return (
    <div className="flex flex-col gap-y-16 h-screen">
      <NavBar hideButton={true} className="mx-4 mt-4 md:mx-8" />
      <div className="flex-grow grid lg:grid-cols-2 place-items-center gap-x-32 px-4 md:px-8">
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
              Getting Started
            </p>
            <p id="sign content text" className="text-lg text-center">
              Unite to foster an environment where creativity, collaboration,
              and mutual respect flourish
            </p>
            {textboxes.map((textbox, index) => (
              <TextBox
                id={textbox.label}
                key={index}
                textRef={textbox.ref}
                label={textbox.label}
                placeholder={textbox.placeholder}
                type={textbox.type}
              />
            ))}
            <Button
              id="Sign up"
              label="Sign up"
              style="btn-secondary w-full mt-4 md:mt-0"
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
