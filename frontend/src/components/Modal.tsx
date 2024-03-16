import Button from "./Button";

interface ModalProps {
  id: string;
  header: string;
  message: string;
  onConfirm: () => void; // function that runs when "Confirm" button is clicked
}

/**
 * A modal with a custom header and message
 * @param props Contains a header, message, and a function defining behaviour on confirmation
 * @returns A modal with a custom header and message
 */
const Modal = (props: ModalProps) => {
  const { id, header, message, onConfirm } = props;

  // Referenced: https://daisyui.com/components/modal/#
  // License: MIT License
  return (
    <>
      <dialog id={`${id}-modal`} data-testid={`${id}-modal`} className="modal">
        <div className="modal-box border-2 border-primary">
          <h3 id="modal-header" className="font-bold text-lg">
            {header}
          </h3>
          <p id="modal-message" className="py-4">
            {message}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <div id="modal-button-container" className="flex gap-3">
                <Button 
                  id="Cancel" 
                  label="Cancel" 
                  style="btn btn-outline btn-accent rounded-xl"
                />
                <Button
                  id="Confirm"
                  label="Confirm"
                  onClick={onConfirm}
                  style="btn btn-outline btn-secondary rounded-xl"
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
