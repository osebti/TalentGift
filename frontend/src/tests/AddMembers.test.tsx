import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddMembers from "@/pages/AddMembers";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

function renderAddMembersPage() {
  return (
    render(
      <BrowserRouter>
        <AddMembers/>
      </BrowserRouter>
    )
  );
}

describe("Rendering the AddMembers Page", () => {

  it("renders correctly", () => {
    const page = renderAddMembersPage();
    expect(page).toMatchSnapshot();
  });

});