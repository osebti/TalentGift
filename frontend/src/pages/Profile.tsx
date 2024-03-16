import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import PageTitle from "@/components/PageTitle";
import { setGlobalState, useGlobalState } from "@/state/global";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import config from "../../../config";



interface TextFieldProps {
  type: string;
  ref1: { current: HTMLInputElement | null };
  ref2?: { current: HTMLInputElement | null };
  ref3?: { current: HTMLInputElement | null };
  content: string;
  editOnClick: (cancel: boolean) => void;
  edit: boolean;
}

interface PassDisplayProps {
  ref1: { current: HTMLInputElement | null } | undefined;
  ref2: { current: HTMLInputElement | null } | undefined;
  ref3: { current: HTMLInputElement | null } | undefined;
}

interface NameEmailDisplayProps {
  ref1: { current: HTMLInputElement | null };
  type: string;
  content: string;
}

const PassDisplay = (props: PassDisplayProps) => {
  const { ref1, ref2, ref3 } = props;
  return (
    <span className="flex flex-col w-3/6 gap-8">
      <TextBox
        data-testid="profile-original-pass"
        id="profile-original-pass"
        textRef={ref1}
        header={false}
        type="password"
        placeholder="Old Password"
      />
      <TextBox
        data-testid="profile-new-pass"
        id="profile-new-pass"
        textRef={ref2}
        header={false}
        type="password"
        placeholder="New Password"
      />
      <TextBox
        data-testid="profile-confirm-pass"
        id="profile-confirm-pass"
        textRef={ref3}
        header={false}
        type="password"
        placeholder="Confirm Password"
      />
    </span>
  );
};

const NameEmailDisplay = (props: NameEmailDisplayProps) => {
  const { ref1, type, content } = props;
  return (
    <span className="flex flex-col w-3/6 gap-8 justify-center">
      <TextBox
        data-testid={`profile-${type}-edit`}
        id={`profile-${type}-edit`}
        textRef={ref1}
        header={false}
        type="text"
        placeholder={content}
      />
    </span>
  );
};

const TextField = (props: TextFieldProps) => {
  const { type, content, editOnClick, edit, ref1, ref2, ref3 } = props;

  const isPass = type == "Password";

  const display = isPass ? (
    <PassDisplay ref1={ref1} ref2={ref2} ref3={ref3} />
  ) : (
    <NameEmailDisplay ref1={ref1} type={type} content={content} />
  );

  return (
    <div
      id={`profile-${type}-container`}
      className="flex flex-grow justify-between gap-5 text-xl"
    >
      <p
        id={`profile-${type}-tag`}
        className={`w-1/6 min-w-fit ${edit && isPass ? "mt-2.5" : "self-center"}`}
      >
        {type}:
      </p>
      {edit ? (
        display
      ) : (
        <p
          data-testid={`profile-${type}-text`}
          id={`profile-${type}-text`}
          className="flex ml-6 w-3/6 min-w-fit self-center"
        >
          {isPass ? "*******" : content}
        </p>
      )}
      <span className={`flex ${isPass ? "" : "self-center"} w-1/6 gap-4`}>
        <Button
          id={`profile-${type}-edit-save`}
          label={edit ? "Save" : "Edit"}
          icon={edit ? <FaCheck /> : <FaRegEdit />}
          style={`justify-center w-3/5 min-w-fit ${edit ? "btn-accent" : "btn-primary"}`}
          navigate={false}
          onClick={() => editOnClick(false)}
        />
        {edit ? (
          <Button
            id={`profile-${type}-cancel`}
            style="justify-center w-3/5 min-w-fit btn-error"
            icon={<MdCancel />}
            onClick={() => editOnClick(true)}
            navigate={false}
            label="Cancel"
          />
        ) : (
          <></>
        )}
      </span>
    </div>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  const uid = user.uid 

  console.log(user)

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const currentRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  console.log(editPass);

    const changeFirstName = (cancel: boolean) => {
        // If name is proper format, send to backend, if successful, update user.name
        // and display success message. If not, display error message and don't close edit state
        // if canceled, close without saving

        if (cancel) {
            console.log('Canceling')
            setEditFirstName(!editFirstName);
            return;
        } else if (firstNameRef.current?.value) {
            fetch(
                `http://${config.hostname}/profile/name/${uid}`,{
                    method: "PATCH",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      firstname: firstNameRef.current?.value,
                      lastname: user.lastName,
                    }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 0) {
                    // Send user data using NavigateOptions
                    console.log(JSON.stringify(data));
                    console.log("First Name Changed Successfully")
                } else {
                    console.log("oh no!")
                }
            });

            console.log('Name Recieved: ', firstNameRef.current?.value);
            setGlobalState('user', { ...user, firstName: firstNameRef.current?.value})
            localStorage.setItem("firstName", firstNameRef.current?.value);
        } 
        setEditFirstName(!editFirstName);
    }

    const changeLastName = (cancel: boolean) => {
        // If name is proper format, send to backend, if successful, update user.name
        // and display success message. If not, display error message and don't close edit state
        // if canceled, close without saving

        if (cancel) {
            console.log('Canceling')
            setEditLastName(!editLastName);
            return;
        } else if (lastNameRef.current?.value) {
            fetch(
                `http://${config.hostname}/profile/name/${uid}`,{
                    method: "PATCH",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      firstname: user.firstName,
                      lastname: lastNameRef.current?.value,
                    }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 0) {
                    // Send user data using NavigateOptions
                    console.log(JSON.stringify(data));
                    console.log("Last Name Updated Successfully")
                } else {
                    console.log("oh no!")
                }
            });

            console.log('Name Recieved: ', lastNameRef.current?.value);
            setGlobalState('user', { ...user, lastName: lastNameRef.current?.value})
            localStorage.setItem("lastName", lastNameRef.current?.value);
        } 
        setEditLastName(!editLastName);
    }


    const changePass = (cancel: boolean) => {
        // If current password is correct and new password matches confirm password
        // then send new password to backend. If backend returns success, then 
        // update user.password, close, and display success message. If canceled, close without saving
        
        
        navigate("/change-password")


        if (cancel) {
            console.log('Canceling')
            setEditPass(!editPass);
            return;
        }
        console.log('Current Password Recieved: ', currentRef.current?.value);
        console.log('New Password Recieved: ', newPassRef.current?.value);
        console.log('Confirm Password Recieved: ', confirmPassRef.current?.value);
    }


  const changeEmail = (cancel: boolean) => {
    // If email is in proper format, send to backend, if successful, update user.email
    // and display success message. If not, display error message and don't close edit state
    // if canceled, close without saving


    if (cancel) {
      console.log("Canceling");
      setEditEmail(!editEmail);
      return;
    } else if (emailRef.current?.value) {
        fetch(
          `http://${config.hostname}/profile/email/${uid}`,{
              method: "PATCH",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: emailRef.current?.value,
              }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 0) {
                // Send user data using NavigateOptions
                console.log(JSON.stringify(data));
                console.log("Email Updated Successfully")
            } else {
                console.log("an unexpected problem occurred...")
            }
        });
      console.log("Email Recieved: ", emailRef.current?.value);
      setGlobalState("user", {
        ...user,
        email: emailRef.current?.value || user.email,
      });
    }
    setEditEmail(!editEmail);
  };

  const toggleNotifications = () => {
    fetch(`http://${config.hostname}/profile/notifications/${user.uid}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          navigate("/error", {
            state: {
              message: "Failed to toggle notification settings",
              returnAddress: "/dashboard/profile",
              returnName: "Profile",
            },
          });
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.notifications) {
          (
            document.getElementById("notification-toggle") as HTMLInputElement
          ).checked = true;
          setGlobalState("user", {
            ...user,
            notifications: true,
          });
          localStorage.setItem("notifications", "true");
        } else {
          (
            document.getElementById("notification-toggle") as HTMLInputElement
          ).checked = false;
          setGlobalState("user", {
            ...user,
            notifications: false,
          });
          localStorage.setItem("notifications", "false");
        }
      });
  };

  return (
    <div id="profile-outer-container" className="px-4 md:px-8">
      <div
        id="profile-header"
        className="flex justify-between items-center mb-8"
      >
        <PageTitle id="profile" title="Profile" />
        <div className="form-control w-52">
          <label className="cursor-pointer label justify-evenly">
            <span className="label-text text-lg px-1">Notifications</span>
            {user.notifications ? (
              <input
                id="notification-toggle"
                type="checkbox"
                className="toggle toggle-primary"
                onChange={toggleNotifications}
                checked
              />
            ) : (
              <input
                id="notification-toggle"
                type="checkbox"
                className="toggle toggle-primary"
                onChange={toggleNotifications}
              />
            )}
          </label>
        </div>
      </div>
      <div id="profile-container" className="flex w-4/6 flex-col mb-12 gap-12">
        <TextField 
          type="First-Name"
          ref1={firstNameRef}
          content={user.firstName} 
          editOnClick={changeFirstName} 
          edit={editFirstName}/>
        <TextField 
          type="Last-Name"
          ref1={lastNameRef}
          content={user.lastName} 
          editOnClick={changeLastName} 
          edit={editLastName}/>
        <TextField
          type="Email"
          ref1={emailRef}
          content={user.email}
          editOnClick={changeEmail}
          edit={editEmail}
        />
        <TextField
          type="Password"
          ref1={currentRef}
          ref2={newPassRef}
          ref3={confirmPassRef}
          content=""
          editOnClick={changePass}
          edit={editPass}
        />
      </div>
    </div>
  );
}
