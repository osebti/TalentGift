import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Settings from "@/pages/Settings";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

function renderSettingsPage() {
  return (
    render(
      <BrowserRouter>
        <Settings/>
      </BrowserRouter>
    )
  );
}

describe("Rendering the Settings Page", () => {

  it("renders correctly", () => {
    const page = renderSettingsPage();
    expect(page).toMatchSnapshot();
  });

  it("renders the delete organization button", () => {
    const { queryByTestId } = renderSettingsPage();
    expect(queryByTestId("delete-org-button")).not.toBeNull();
  });

});

describe("Deleting the Organization", () => {
  
  it("directs to organization deletion page", () => {
    // click on the delete organization button
    const { queryByTestId } = renderSettingsPage();
    const deleteOrgButton = queryByTestId("delete-org-button");
    if (deleteOrgButton != null) {
      fireEvent.click(deleteOrgButton);
    }
    // check if the user is redirected to the delete organization page
    expect(global.window.location.href).toContain("/delete-org");
  });

});