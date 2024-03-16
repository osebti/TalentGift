//#region import
// utilities
import { twMerge } from "tailwind-merge";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useGlobalState } from "@/state/global";
import config from "../../../config";

// components
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import { HiOutlineDocumentReport } from "react-icons/hi";
//#endregion

//#region types & interfaces
interface Member {
  name: string;
  id: string;
  membership: string;
  position: string;
}

interface GetMembersProps {
  oid: string;
}

interface MemberTableHeaderProps {
  columns: Member;
  style?: string;
}

interface MemberRowProps {
  member: Member;
  style?: string;
  btnStyle?: string;
  deleteRow: (id: string) => void;
  loggedInUserID: string;
}

interface MemberTableProps {
  members: Member[];
  setMembers: Dispatch<SetStateAction<Member[]>>;
  loggedInUserID: string;
}
//#endregion

//#region data handling

/**
 * This function sends a request to the server
 * to delete a member from an organization
 * @param id The ID of the member to delete
 */
function DeleteMember(id: string) {
  fetch(`http://${config.hostname}/members/${id}`, {
    method: "DELETE",
  });
}
//#endregion

//#region fragment component

/**
 * This renders the header for a members table
 * @param props Member Table Header Props
 * @return A header for the members table
 */
function MemberTableHeader(props: MemberTableHeaderProps) {
  const { columns, style } = props;
  return (
    <li
      id="table-header"
      className={twMerge(
        "flex flex-row w-full rounded-xl border-0 text-black items-center",
        style
      )}
    >
      <div className="w-1/5 px-4 md:px-8">{columns.name}</div>
      <div className="w-1/5 px-4 md:px-8">{columns.id}</div>
      <div className="w-1/5 px-4 md:px-8">{columns.membership}</div>
      <div className="w-1/5 px-4 md:px-8">{columns.position}</div>
      <div className="w-1/5 px-4 md:px-8">Options</div>
    </li>
  );
}

/**
 * This renders a row of the members table
 * @param props Member Row Props
 * @return A row of the members table containing a member's data
 */
function MemberRow(props: MemberRowProps) {
  const { member, style, btnStyle, deleteRow, loggedInUserID } = props;
  const navigate = useNavigate();
  return (
    <>
      <li
        id={member.id}
        className={twMerge(
          "relative w-full h-full flex flex-row rounded-xl border-0 text-black items-center",
          style
        )}
      >
        <div className="w-1/5 px-4 md:px-8">{member.name}</div>
        <div className="w-1/5 px-4 md:px-8">{member.id}</div>
        <div className="w-1/5 px-4 md:px-8">{member.membership}</div>
        <div className="w-1/5 px-4 md:px-8">{member.position}</div>
        {/* Do not allow users to delete themselves */}
        {member.id !== loggedInUserID ? (
          <div className="w-1/5 px-4 md:px-8 flex justify-around items-center gap-1">
            <button
              id={`${member.id}-view`}
              data-testid={`${member.id}-view`}
              className={twMerge("btn btn-square btn-outline", btnStyle)}
              onClick={() => navigate(`/dashboard/report/${member.id}`)}
            >
              <HiOutlineDocumentReport size={25} />
            </button>
            <button
              id={`${member.id}-delete`}
              data-testid={`${member.id}-delete`}
              className={twMerge("btn btn-square btn-outline", btnStyle)}
              onClick={() => {
                (
                  document.getElementById(
                    "delete-member-modal"
                  ) as HTMLDialogElement
                ).showModal();
                deleteRow(member.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </li>
    </>
  );
}

/**
 * This renders a table of the organization's members
 * @param props Member Table Props
 * @returns A members table
 */
function MemberTable(props: MemberTableProps) {
  const { members, setMembers, loggedInUserID } = props;
  const [selectedMemberID, setSelectedMemberID] = useState("0");
  return (
    <>
      <ul className="w-full flex flex-col justify-center items-center gap-4">
        {/** Row containing column names */}
        <MemberTableHeader
          columns={{
            name: "Name",
            id: "ID",
            membership: "Membership",
            position: "Position",
          }}
          style="min-h-[2rem] bg-neutralTransparent font-semibold"
        />
        {/** Rows containing member data */}
        {members.map((elem, index) => (
          <MemberRow
            key={index}
            member={elem}
            style={twMerge(
              "min-h-[4em]",
              index % 2 === 0 ? "bg-primaryTransparent" : "bg-accentTransparent"
            )}
            deleteRow={() => setSelectedMemberID(members[index].id)}
            btnStyle={index % 2 === 0 ? "btn-accent" : "btn-primary"}
            loggedInUserID={loggedInUserID}
          />
        ))}
      </ul>
      <Modal
        id="delete-member"
        header="Delete Member"
        message={`Are you sure you want to delete member with UID ${selectedMemberID}?`}
        onConfirm={() => {
          DeleteMember(selectedMemberID);
          const updatedMembers = members.filter(
            (member) => member.id != selectedMemberID
          );
          setMembers(updatedMembers);
        }}
      />
    </>
  );
}

//#endregion

export default function Members() {
  const initialArr: Member[] = []; // Create an empty array of type Member[]
  const [members, setMembers] = useState(initialArr);
  // Problem: mid and oid become undefined if the user refreshes the page

  const [user] = useGlobalState("user");
  const [org] = useGlobalState("org");

  const oid = org.oid;
  const uid = user.uid;

  useEffect(() => {
    async function GetMembers(props: GetMembersProps) {
      const { oid } = props;
      const membersResponse = await fetch(
        `http://${config.hostname}/organization/members/${oid}`
      );
      const membersData = await membersResponse.json();
      const membersArr: Member[] = [];
      membersData.forEach(
        (memberData: {
          firstname: string;
          lastname: string;
          uid: number;
          membership: string;
          role: string;
        }) => {
          membersArr.push({
            name: `${memberData.firstname} ${memberData.lastname}`,
            id: String(memberData.uid),
            membership: memberData.membership,
            position: memberData.role,
          });
        }
      );
      setMembers(membersArr);
    }

    GetMembers({ oid }).catch(console.error);
  }, [members.length, uid, oid]);

  return (
    <div className="w-full flex flex-col justify-center gap-12 px-8 md:px-12 pb-8">
      {/** Title of page */}
      <PageTitle id="members" title="Members" />
      {/** Add members button (directs to AddMembers page) */}
      <Button
        id="add-members"
        label="Add Members"
        href="/dashboard/add-members"
        navigate
        style="btn-secondary rounded-2xl"
      />
      {/** Table listing members */}
      <MemberTable
        members={members}
        setMembers={setMembers}
        loggedInUserID={uid}
      />
    </div>
  );
}
