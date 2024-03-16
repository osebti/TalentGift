import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Profile from "@/pages/Profile";
import { setGlobalState } from "@/state/global";
import { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
global.alert = jest.fn();
console.error = jest.fn();
console.warn = jest.fn();
console.log = jest.fn();
beforeEach(() => {
  fetchMock.resetMocks();
});

afterEach(cleanup);

/* Tests
    RENDERING:
        Page Rendering
    DATA:
        Displays name
        Displays email
        Does not display password
    EDIT:
        Name edit button functions
        Email edit button functions
        Password edit button functions
    TODO SUCCESS:
        Name edit success
        Email edit success
        Password edit success
    TODO FAILURE:
        Name edit failure
        Email edit failure
        Password edit failure

*/

beforeAll(() => {
  setGlobalState("user", {
    uid: "123",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    manager: true,
    notifications: true,
  });
});

describe("Profile renders", () => {
  // Test for rendering the page properly
  it("profile page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(getByTestId("profile-First-Name-text")).toBeInTheDocument();
    expect(getByTestId("profile-Last-Name-text")).toBeInTheDocument();
    expect(getByTestId("profile-Email-text")).toBeInTheDocument();
  });
});

describe("Profile displays", () => {
  // Test for correct name and email display
  it("correct name and email", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(getByTestId("profile-First-Name-text")).toHaveTextContent("John");
    expect(getByTestId("profile-Last-Name-text")).toHaveTextContent("Doe");
    expect(getByTestId("profile-Email-text")).toHaveTextContent(
      "john@example.com"
    );
  });
});

describe("Profile edit button", () => {
  // Test for edit/save button functionality for First Name
  it("allows first name editing", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("profile-First-Name-edit-save-button"));
    expect(getByTestId("profile-First-Name-edit textbox")).toBeInTheDocument();
  });

  // Test for edit/save button functionality for Last Name
  it("allows last name editing", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("profile-Last-Name-edit-save-button"));
    expect(getByTestId("profile-Last-Name-edit textbox")).toBeInTheDocument();
  });

  // Test for edit/save button functionality for Email
  it("allows email editing", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("profile-Email-edit-save-button"));
    expect(getByTestId("profile-Email-edit textbox")).toBeInTheDocument();
  });

  // Test for edit/save button functionality for Password
  //it("allows password editing", () => {
    //const { getByTestId } = render(
      //<BrowserRouter>
        //<Profile />
      //</BrowserRouter>
    //);
    //fireEvent.click(getByTestId("profile-Password-edit-save-button"));
    //expect(getByTestId("profile-original-pass textbox")).toBeInTheDocument();
    //expect(getByTestId("profile-new-pass textbox")).toBeInTheDocument();
    //expect(getByTestId("profile-confirm-pass textbox")).toBeInTheDocument();
  //});
});

describe("Profile editing", () => {
  // Test for cancel button functionality that covers first name, last name, email, and password
  it("cancel button stops editing", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("profile-First-Name-edit-save-button"));

    const nameInput = getByTestId("profile-First-Name-edit textbox");
    fireEvent.change(nameInput, { target: { value: "James" } });

    fireEvent.click(getByTestId("profile-First-Name-cancel-button"));
    expect(getByTestId("profile-First-Name-text")).toHaveTextContent("John");
  });

  // Test for save button functionality that covers first name, last name and email
  it("save button saves info and stops editing", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    fireEvent.click(getByTestId("profile-First-Name-edit-save-button"));
    expect(getByTestId("profile-First-Name-edit-save-button")).toBeInTheDocument();

    const nameInput = getByTestId("profile-First-Name-edit textbox");
    fireEvent.change(nameInput, { target: { value: "James" } });

    fetchMock.mockResponseOnce(JSON.stringify({firstname: "James", lastname: "Doe"}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    fireEvent.click(getByTestId("profile-First-Name-edit-save-button"));
    
    // check to ensure fetch was called
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(getByTestId("profile-First-Name-text")).toHaveTextContent("James");
  });
});