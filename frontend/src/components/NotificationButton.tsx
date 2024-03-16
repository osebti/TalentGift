import { useGlobalState } from "@/state/global";
import config from "../../../config";
import Modal from "./Modal";

interface Member {
  uid: string;
  email: string;
}

export default function NotificationButton() {
  const [user] = useGlobalState("user");
  const uid = user.uid
  const [org] = useGlobalState("org");
  const oid = org.oid;

  /**
   * Handle confirm button click (send email notification to employees)
   */
  async function handleConfirm() {
    // Get logged in user's uid and oid
    const membersResponse = await fetch(
      `http://${config.hostname}/organization/members/emails/${oid}`
    );
    const members: Member[] = await membersResponse.json();

    // Exclude logged in user
    const membersToNotify = Array.from(members).filter(
      (member) => member.uid != uid
    );
    const requests: Promise<Response>[] = [];
    membersToNotify.forEach((member) => {
      // Send email notification
      const request = fetch(`http://${config.hostname}/links/send_link?email=${member.email}`);

      requests.push(request);
    });
    // Wait for all requests to be fulfilled before proceeding
    await Promise.all(requests);
    console.log("Notification sent!");
  }

  return (
    <>
      <Modal
        id="notification"
        header="Send Survey Notification"
        message="Are you sure you want to send a survey notification to all members in the organization?"
        onConfirm={handleConfirm}
      />
      <button
        className="btn btn-md rounded-full font-normal text-white text-sm md:text-base w-14 bg-secondary"
        onClick={() =>
          (
            document.getElementById("notification-modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <img src="/notification.svg" alt="Notification Bell"></img>
      </button>
    </>
  );
}
