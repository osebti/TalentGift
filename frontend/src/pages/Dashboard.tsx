//#region import

// components
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";
import { Tab } from "@/components/SideBar";

// icons
import { GoOrganization } from "react-icons/go";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { RiSurveyLine } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";
import { useGlobalState } from "@/state/global";
//#endregion

/**
 * This renders a dashboard with
 * a sidebar and the outlet
 * @returns a dashboard template
 */
export default function Dashboard() {
  // Get uid and oid from state (sent from sign in/sign up)
  const [user] = useGlobalState("user");
  const [org] = useGlobalState("org");
  const contextPackage = { uid: user.uid, oid: org.oid };

  console.log(user.uid, user.email, org.oid, user.manager);

  //#region variables
  const orgtabs: Tab[] = [
    {
      icon: <GoOrganization />,
      label: "Overview",
      to: "",
    },
    {
      icon: <BsPersonFill />,
      label: "Members",
      to: "members",
    },
    {
      icon: <RiSurveyLine />,
      label: "Survey",
      to: "survey",
    },
    {
      icon: <HiOutlineDocumentReport />,
      label: "Report",
      to: `report/${user.uid}`,
    },
    {
      icon: <CgProfile />,
      label: "Profile",
      to: "profile",
    },
    {
      icon: <SlSettings />,
      label: "Settings",
      to: "settings",
    },
  ];

  if (!user.manager) {
    // Remove Members and Settings tabs if user is not a manager
    orgtabs.splice(1, 1);
    orgtabs.splice(4, 1);
  }
  //#endregion

  return (
    <div className="flex flex-row relative overflow-auto h-screen">
      {/* SideBar */}
      <SideBar
        className="lg:w-[24%] lg:sticky lg:top-0"
        tabs={orgtabs}
        path="/"
        id={user.uid}
        logoutLabel="Back to Home"
      />
      {/* Attached Outlet */}
      <div className="lg:absolute h-screen top-0 left-[24%] lg:w-[76%] py-12">
        <Outlet context={contextPackage} />
      </div>
    </div>
  );
}
