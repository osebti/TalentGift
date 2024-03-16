import {  useRef } from "react";
import config from "../../../config.js";

// components
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import NavBar from "@/components/NavBar";



interface TextboxProps {
  label: string;
  placeholder: string;
  type: string;
  ref: { current: HTMLInputElement | null };
}


export default function EmailConfirm() {
  const emailRef = useRef<HTMLInputElement>(null);



  const textboxes: TextboxProps[] = [

    {
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      ref: emailRef,
    }

  ];

// change password onClick function 
  const changePassword = () => {
    console.log("Login button clicked");
    if (emailRef.current) {

      // Send change password request to backend
      const email = emailRef.current.value;
      console.log(email);

      fetch(
        `http://${config.hostname}/links/resetLink?email=${email}`
        )
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 0) {
            // Send user data using NavigateOptions
            window.alert("Email sent!");
          }
       
          else {
            // internal error 
            window.alert("Invalid Email");
          }

        });
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
              Reset Your Password
            </p>
            <p id="change_pass content text" className="text-lg text-center">
              Please provide the email linked to your account
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
                
              </>
            ))}
            <Button
              id="Change Password"
              label="Change Password"
              style="btn-secondary w-full"
              onClick={changePassword}
          
            />
          </div>
        </div>
      </div>
    </div>
  );
}
