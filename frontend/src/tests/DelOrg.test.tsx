//#region imports
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

import DelOrg from "@/pages/DelOrg";
import { BrowserRouter } from "react-router-dom";
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
function renderDelOrgPage() {
  return (
    render(
      <BrowserRouter>
        <DelOrg/>
      </BrowserRouter>
    )
  );
}
//#endregion

//#region tests
describe("Rendering the Delete Organization Page", () => {

  it("renders correctly", () => {
    const page = renderDelOrgPage();
    expect(page).toMatchSnapshot();
  });

  it("renders the delete organization button", () => {
    const { queryByTestId } = renderDelOrgPage();
    expect(queryByTestId("del-org-button")).not.toBeNull();
  });

});

describe("Deleting the Organization", () => {
  
  it("organization is deleted if the user confirms", async () => {
    const { queryByTestId } = renderDelOrgPage();

    // mock organization deletion
    fetchMock.mockResponseOnce(
      JSON.stringify({ status: 0 }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    // click the delete organization button
    const deleteOrgButton = queryByTestId("del-org-button");
    if (deleteOrgButton != null) {
      fireEvent.submit(deleteOrgButton);
    }

    // click confirm
    const confirmButton = queryByTestId("Confirm-button");
    if (confirmButton != null) {
      fireEvent.click(confirmButton);
    }

    // check for redirect and fetch request
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(global.window.location.href).toContain("/success");
    });
  });

  it("organization is not deleted if the user cancels", async () => {
    // mock organization deletion
    fetchMock.mockResponseOnce(
      JSON.stringify({ status: 0 }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    // click the delete organization button
    const { queryByTestId } = renderDelOrgPage();
    const deleteOrgButton = queryByTestId("del-org-button");
    if (deleteOrgButton != null) {
      fireEvent.submit(deleteOrgButton);
    }
    // click cancel
    const cancelButton = queryByTestId("Cancel-button");
    if (cancelButton != null) {
      fireEvent.click(cancelButton);
    }
    // make sure delete organization request was not made
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(0);
    });
  });

});
//#endregion