import { useLocation, useNavigate } from "react-router-dom";
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



export default function ResetPassword() {
  const newPassRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const token = query.get('token')
  var email=""
  fetch(
    `http://${config.hostname}/links/check_pass_token?token=${token}`
 ).then((res) => res.json())
  .then((data) => {
    if (data.status == 1) {
      navigate("/error") // invalid link, send user to home page 
    }
    email = data.email

  
  });


  const textboxes: TextboxProps[] = [

    {
      label: "New Password",
      placeholder: "Enter your new password",
      type: "password",
      ref: newPassRef,
    }

  ];

// change password onClick function 
  const changePassword = () => {
    console.log("change password button clicked");
    if (newPassRef.current) {

      // Send change password request to backend

      const password = newPassRef.current.value;
      console.log(password);

      fetch(
        `http://${config.hostname}/reset-password/resetPass?email=${email}&password=${password}`
        )
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 0) {
            // Send user data using NavigateOptions
            navigate("/password-changed")
        
          }
       
          else {
            // internal error 
            throw Error("Internal Error");
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
              </>
            ))}
            <Button
              id="Change Password"
              label="Change Password"
              style="btn-secondary w-full"
              onClick={changePassword}
              navigate={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
