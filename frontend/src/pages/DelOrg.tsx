//#region import
import config from "../../../config";
// import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "@/components/Modal";
import { setGlobalState, useGlobalState } from "@/state/global";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
//#endregion

export default function DelOrg() {
  const [user] = useGlobalState("user");
  const [org] = useGlobalState("org");
  const oid = org.oid;
  const navigate = useNavigate();

  /**
   * This function sends a request to the server
   * to delete the organization
   * @param id The ID of the organization to delete
   */
  const deleteOrgOnClick = (id: string) => {
    fetch(`http://${config.hostname}/organization/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 0) {
          // User loses manager status on organization deletion
          setGlobalState("user", { ...user, manager: false });
          navigate("/success", {
            state: {
              message: "Organization deleted!",
              returnAddress: "/dashboard",
              returnName: "Dashboard",
            },
          });
        } else {
          navigate("/error", {
            state: {
              message: "Failed to delete organization ...",
              returnAddress: "/dashboard",
              returnName: "Dashboard",
            },
          });
        }
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center px-4">
      <div className="flex flex-col w-2/3 justify-center items-center gap-2">
        {/** Title and subtitle of the page */}
        <div
          id="content-header"
          className="font-semibold text-2xl flex flex-col justify-center items-center my-6 md:my-8 lg:my-10"
        >
          Are You Sure? This Action Cannot Be Undone
          <div
            id="content-title"
            className="font-semibold text-2xl md:text-3xl lg:text-4xl text-black"
          ></div>
        </div>
        <Button
          id="del-org"
          label="Delete Organization"
          onClick={() => {
            (
              document.getElementById("delete-org-modal") as HTMLDialogElement
            ).showModal();
          }}
          style="btn-secondary rounded-2xl mx-4 md:mx-8"
        ></Button>
        {/** Organization deletion modal */}
        <Modal
          id="delete-org"
          header="Delete Organization"
          message={`Are you sure you want to delete the organization with oid ${oid}?`}
          onConfirm={() => {
            deleteOrgOnClick(oid);
          }}
        />
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
