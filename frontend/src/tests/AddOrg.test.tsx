//#region imports
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from 'jest-fetch-mock';

import AddOrg from "@/pages/AddOrg";
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
function renderAddOrgPage() {
  return (
    render(
      <BrowserRouter>
        <AddOrg/>
      </BrowserRouter>
    )
  );
}
//#endregion

//#region tests
describe("Rendering the AddOrg Page", () => {

  it("renders correctly", () => {
    const page = renderAddOrgPage();
    expect(page).toMatchSnapshot();
  });

  it("renders organization name input field", () => {
    const { queryByTestId } = renderAddOrgPage();
    expect(queryByTestId("org-name textbox")).not.toBeNull();
  });

  it("renders create organization button", () => {
    const { queryByTestId } = renderAddOrgPage();
    expect(queryByTestId("create-org-button")).not.toBeNull();
  });

});

describe("Creating an organization", () => {

  it("handles successful organization creation", async () => {
    const { queryByTestId } = renderAddOrgPage();
    
    // mock successful organization creation request
    fetchMock.mockResponseOnce(
      JSON.stringify({ status: 0 }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    // enter an organization name and submit
    const nameInput = queryByTestId("org-name textbox");
    const createOrgBtn = queryByTestId("create-org-button");

    if (nameInput != null && createOrgBtn != null) {
      fireEvent.change(nameInput, { target: { value: "Test Organization Name" } });
      fireEvent.click(createOrgBtn);
    }

    // check if fetch request was sent and page was redirected
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(global.window.location.href).toContain("/success");
    });
  });

  it("does not create organization if no organization name is given", () => {
    const { queryByTestId, queryByText } = renderAddOrgPage();

    // check that the invalid input message is not already showing
    expect(queryByText("Invalid input. Enter a non-empty name at most 255 characters in length.")).toBeNull();

    // press submit without entering an organization name
    const createOrgBtn = queryByTestId("create-org-button");

    if (createOrgBtn != null) {
      fireEvent.click(createOrgBtn);
    }

    // check if the invalid input message is shown
    expect(queryByText("Invalid input. Enter a non-empty name at most 255 characters in length.")).not.toBeNull();
  });

});
//#endregion