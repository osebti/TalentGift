import { addMembers } from "../utils/add-members";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import Button from "@/components/Button";
import { useGlobalState } from "@/state/global.ts";
import PageTitle from "@/components/PageTitle.tsx";

/**
 * Renders an Example table with 1 row showing users how they should input data into Excel
 * @returns Example table demonstrating how users should input data into Excel
 */
function ExampleTable() {
  // Referenced: https://daisyui.com/components/table/
  // License: MIT License
  return (
    <div className="max-w-xs md:max-w-lg lg:max-w-5xl overflow-auto">
      <table className="table">
        {/* head (column names) */}
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>
              This position has a critical impact in operational continuity and
              corporate strategic development
            </th>
            <th>
              Highly specialized position requiring expertise in rare tools or
              processes; demands intensive internal training due to limited
              availability and high skill requirements in the market.
            </th>
            <th>
              Decisions impact company revenue, resource allocation, and area
              budgets; influence functional processes and business structure.
            </th>
          </tr>
        </thead>
        <tbody>
          {/* table row */}
          <tr>
            <td>John</td>
            <td>Smith</td>
            <td>john.smith@gmail.com</td>
            <td>HR Leader</td>
            <td>4</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function InstructionsSection() {
  return (
    <div className="flex flex-col w-full">
      <p className="flex w-full">
        Please ensure you follow the instructions below to successfully upload
        your Excel file!
      </p>
      <ul className="steps steps-vertical my-4 text-lg">
        <li className="step step-primary">
          <div className="flex flex-col w-full">
            Download the following Excel template:
            <Link
              className="text-primary font-bold underline"
              to="/files/Talent_Gift_Members_Template.xlsx"
              target="_blank"
              download
            >
              Download
            </Link>
          </div>
        </li>
        <li className="step step-primary">
          <div className="flex flex-col w-full">
            Enter the first/last name, email, and position at company for each
            employee.
          </div>
        </li>
        <li className="step step-primary">
          <div className="flex flex-col w-full">
          There are 3 questions about the employee's position at the company (in
          columns E-G). Rate each question on a scale of 1-5:
          </div>
        </li>
      </ul>
      <ul className="steps mb-6">
        <li className="step step-accent">basic position</li>
        <li className="step step-accent">less critical position</li>
        <li className="step step-accent">somewhat critical position</li>
        <li className="step step-accent">critical position</li>
        <li className="step step-accent">highly critical position</li>
      </ul>

      <p>A row in your table might look like the following: </p>
      <ExampleTable />
    </div>
  );
}

/**
 * This function returns the AddMembers page
 * @returns AddMembers page
 */
export default function AddMembers() {
  const [file, setFile] = useState<File>();
  const [invalidFile, setInvalidFile] = useState(false);
  const [org] = useGlobalState("org");
  const navigate = useNavigate();

  /**
   * Get error message based on type of error
   * @param error Type of error
   * @param column Name of column (first name, last name, email, or position)
   * @param row Row number
   * @param reason Reason for error (optional)
   * @returns An error message
   */
  function getErrorMessage(
    error: string,
    column: string,
    row: number,
    reason: string | undefined
  ) {
    if (error === "required") {
      return `${column} missing in row ${row}`;
    } else if (reason) {
      return reason;
    } else {
      // Worst case scenario, return a vague error message
      return "Something went wrong...";
    }
  }

  /**
   * Handles the submission of a file upload form
   * @param e Form event to be submitted
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file?.name.endsWith(".xlsx")) {
      setInvalidFile(true);
      return;
    }
    if (file !== undefined) {
      const response = await addMembers(file, org.oid);
      const status = response.status;
      setInvalidFile(false);

      if (status === 0) {
        navigate("/success", {
          state: {
            message: "Members successfully added to organization!",
            returnAddress: "/dashboard",
            returnName: "Dashboard",
          },
        });
      } else {
        const error = response.errors[0];
        const message: string = getErrorMessage(
          error.error,
          error.column,
          error.row,
          error.reason
        );
        navigate("/error", {
          state: {
            message: message,
            returnAddress: "/dashboard",
            returnName: "Dashboard",
          },
        });
      }
    }
  }

  /**
   * Changes the file stored based on the file selected
   * @param e Change event containing the current file selected
   */
  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    // Referenced: https://stackoverflow.com/questions/30483645/get-file-object-from-file-input
    // Author: https://stackoverflow.com/users/529829/dana-woodman
    // License: CC BY-SA 4.0
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  }

  return (
    <>
      <div
        id="add-page-container"
        className="flex flex-col gap-6 w-full h-full px-4 md:px-8"
      >
        <PageTitle id="add-members" title="Add Members" style="font-normal" />
        {/* Instructions for submitting Excel file */}
        <InstructionsSection />
        <div id="add-page-content" className="grid grid-cols-2 gap-6">
          <form
            id="add-members-form"
            action="post"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-4 col-span-2 md:col-span-1 lg:col-span-1"
          >
            {/* Excel file input */}
            <label
              htmlFor="fileSelect"
              className="sm:text-sm md:text-md lg:text-lg"
            >
              Upload File
            </label>
            <input
              id="add-members-file-select"
              className="file-input file-input-bordered file-input-primary w-full max-w-md"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileSelected}
              required
            />
            <p>Accepted file types: .xlsx</p>
            {/* TO-DO: Add error handling (form validation) */}
            {invalidFile ? (
              <p id="add-members-error" className="text-error">
                Only Excel files (.xlsx) accepted!
              </p>
            ) : null}
            {/* Submit Button */}
            <Button
              id="add-members-submit"
              label="Submit"
              style="btn-secondary"
            />
          </form>
        </div>
      </div>
    </>
  );
}
