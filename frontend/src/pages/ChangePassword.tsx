import {useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import config from "../../../config.js";

// components
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import NavBar from "@/components/NavBar";
import {useGlobalState } from "@/state/global";

interface TextboxProps {
  label: string;
  placeholder: string;
  type: string;
  ref: { current: HTMLInputElement | null };
}


export default function ChangePassword() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const uid=useGlobalState("user")[0].uid
  const navigate = useNavigate();
  const [invalidPassword, setInvalidPassword] = useState(false);
  const invalidCredentials: boolean[] = [invalidPassword];


  const textboxes: TextboxProps[] = [
    {
      label: "Current Password",
      placeholder: "Enter your current password",
      type: "password",
      ref: passwordRef,
    },
    {
      label: "New Password",
      placeholder: "Enter your current password",
      type: "password",
      ref: newPassRef,
    }

  ];

  const errorMessages: JSX.Element[] = [

    <p className="text-error self-start">Incorrect password!</p>,
  ];
// change password onClick function 
  const changePass = () => {
    console.log("Login button clicked");
    if (passwordRef.current && newPassRef.current) {
      
      // Send change password request to backend
      const password = passwordRef.current.value;
      const new_pass = newPassRef.current.value;
      console.log(password);
      fetch(
        `http://${config.hostname}/reset-password/resetPass?uid=${uid}&password=${password}&new_pass=${new_pass}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 0) {
            // Send user data using NavigateOptions
            navigate("/password-changed");
          }
       
          else {
            // Incorrect current password  
            setInvalidPassword(true);
            window.alert("Invalid Password")
          }

        });
    }
    else{
      window.alert("You must type your password(s)")
    }
  };

  return (
    <div className="px-4 md:px-8 h-screen flex flex-col">
      <NavBar className="mt-4 lg:col-span-2" hideButton={true} />
      <div className="flex-grow grid lg:grid-cols-2 place-items-center gap-x-32">
        <div
          id="change_pass container"
          className="flex flex-row flex-wrap justify-center items-center col-start-1"
        >
          <div
            id="change_pass content container"
            className="flex flex-col justify-center items-center gap-4 md:gap-8"
          >
            <p
              id="change_pass content header"
              className="text-4xl md:text-6xl font-bold text-center whitespace-nowrap"
            >
              Change Your Password
            </p>
            <p id="change_pass content text" className="text-lg text-center">
              Please provide your current and new password below
            </p>
            {textboxes.map((textbox, index) => (
              <>
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
              </>
            ))}
            <Button
              id="Change Password"
              label="Change Password"
              style="btn-secondary w-full"
              onClick={changePass}    
            />
          </div>
        </div>
      </div>
    </div>
  );
}
