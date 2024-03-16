//#region import
import config from "../../../config";

// components
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import { setGlobalState, useGlobalState } from "@/state/global";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//#endregion

export default function AddOrg() {
  const [user] = useGlobalState("user");
  const [org] = useGlobalState("org");
  const orgNameRef = useRef<HTMLInputElement>(null);
  const [validInput, setValid] = useState(true);
  const navigate = useNavigate();

  // handle sending a request to the server to create an organization
  const createOrgOnClick = () => {
    if (orgNameRef.current != null) {
      const orgName = orgNameRef.current.value.trim();

      // input checking
      if (orgName === "" || orgName.length > 255) {
        setValid(false);
      }
      
      // otherwise send the request
      else {
        fetch(`http://${config.hostname}/organization/create_organization`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mid: user.uid,
          orgname: orgName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // navigate to success page if status is 0
          if (data.status === 0) {
            navigate("/success", {
              state: {
                message: "Successfully created organization!",
                returnAddress: "/dashboard",
                returnName: "Dashboard",
              },
            });
            setGlobalState("user", { ...user, manager: true }); // denote that user is now a manager
            setGlobalState("org", { ...org, oid: data.id });
            // nativate to error page if status is 1
          } else if (data.status === 1) {
            navigate("/error", {
              state: {
                message: "Failed to create an organization ...",
                returnAddress: "/dashboard",
                returnName: "Dashboard",
              },
            });
          }
        })
        .catch((err) => {
          // navigate to error page if exception occurred
          navigate("/error", {
            state: {
              message: err,
              returnAddress: "/dashboard",
              returnName: "Dashboard",
            },
          });
        });
      }
    }
  };

  // Add Organization page
  return (
    <div className="w-full h-full flex justify-center items-center px-4">
      <div className="flex flex-col w-2/3 justify-center items-center gap-2">
        {/** Title and subtitle of the page */}
        <div
          id="content-header"
          className="flex flex-col justify-center items-center my-6 md:my-8 lg:my-10"
        >
          <div
            id="content-title"
            className="font-semibold text-2xl md:text-3xl lg:text-4xl text-black"
          >
            Set up your organization
          </div>
          <div
            id="content-subtitle"
            className="text-md md:text-lg lg:text-xl text-secondary"
          >
            Tell us about your organization
          </div>
        </div>
        {/** Organization creation form */}
        <div
          id="create-org-form"
          className="flex flex-col w-full justify-center items-start gap-6"
        >
          {/** Organization name input field and invalid input message */}
          <TextBox
            id="org-name"
            label=""
            placeholder="Organization Name"
            type="text"
            textRef={orgNameRef}
          />
          { validInput 
            ? null
            : <p className="text-error">
                Invalid input. Enter a non-empty name at most 255 characters in length.
              </p>
          }
          {/** Create organization button */}
          <Button
            id="create-org"
            label="Next"
            style="btn-secondary w-full rounded-xl"
            onClick={createOrgOnClick}
          />
        </div>
        {/** Back to dashboard link */}
        <Link className="mx-4 md:mx-8 lg:mx-0" to="/dashboard">
          <div className="flex justify-center items-center">
            <div className="text-secondary hover:text-black transition ease-in-out text-center">
              I change my mind, back to Dashboard
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
