//#region imports
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

import Members from "@/pages/Members";
//#endregion

//#region test setup
fetchMock.enableMocks();
console.error = jest.fn();
console.warn = jest.fn();
console.log = jest.fn();

beforeEach(() => {
  fetchMock.resetMocks();
});

afterEach(cleanup);
//#endregion

//#region functions and objects used for testing
const mockMembers = [
  {
    firstname: "John",
    lastname: "Smith",
    uid: 1,
    membership: "Manager",
    role: "CEO",
  },
  {
    firstname: "Erika",
    lastname: "Lee",
    uid: 2,
    membership: "Member",
    role: "Accountant",
  },
];

function renderMembersPage() {
  // mock fetch request for members
  fetchMock.mockResponseOnce(JSON.stringify(mockMembers), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  // render page
  const membersPage = render(
    <BrowserRouter>
      <Members />
    </BrowserRouter>
  );

  // check to ensure fetch was called
  expect(fetchMock).toHaveBeenCalledTimes(1);

  return membersPage;
}
//#endregion

//#region tests
describe("Rendering the Members Page", () => {
  it("renders correctly", async () => {
    const page = renderMembersPage();
    await waitFor(() => {
      expect(page).toMatchSnapshot();
    });
  });

  it("renders the add members button", async () => {
    const { queryByTestId } = renderMembersPage();
    await waitFor(() => {
      expect(queryByTestId("add-members-button")).not.toBeNull();
    });
  });
});

describe("Displaying the Organization Members", () => {
  it("displays all of the organization members", async () => {
    const { queryByText } = renderMembersPage();
    await waitFor(() => {
      expect(queryByText("John Smith")).not.toBeNull();
      expect(queryByText("Erika Lee")).not.toBeNull();
    });
  });
});

describe("Deleting the Organization Members", () => {
  it("member is deleted from members table if the user confirms", async () => {
    const { queryByTestId, queryByText } = renderMembersPage();

    await waitFor(() => {
      // click the delete button for member Erika
      const deleteButton = queryByTestId("2-delete");
      if (deleteButton != null) {
        fireEvent.click(deleteButton);
      }
      // click the confirm button
      const confirmButton = queryByTestId("Confirm-button");
      if (confirmButton != null) {
        fireEvent.submit(confirmButton);
      }
      // check member deletion
      expect(queryByText("Erika Lee")).toBeNull();
    });
  });

  it("member is not deleted from members table if the user cancels", async () => {
    const { queryByTestId, queryByText } = renderMembersPage();

    // click the delete button for member Erika
    await waitFor(() => {
      // click the delete button for member Erika
      const deleteButton = queryByTestId("2-delete");
      if (deleteButton != null) {
        fireEvent.submit(deleteButton);
      }
      // click the cancel button
      const cancelButton = queryByTestId("Cancel-button");
      if (cancelButton != null) {
        fireEvent.submit(cancelButton);
      }
      // check for member
      expect(queryByText("Erika Lee")).not.toBeNull();
    });
  });

});

describe("Viewing Member Reports", () => {

  it("the view report button directs to the employee report", async () => {
    const { queryByTestId } = renderMembersPage();

    await waitFor(() => {
      // click the view button for member Erika
      const viewButton = queryByTestId("2-view");
      if (viewButton != null) {
        fireEvent.click(viewButton);
      }
      // check for redirect to her report
      expect(global.window.location.href).toContain("/dashboard/report/2");
    });

  });

});
//#endregion
