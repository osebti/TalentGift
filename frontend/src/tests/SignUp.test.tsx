//#region imports
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

import SignUp from "@/pages/SignUp";
import { BrowserRouter } from "react-router-dom";
//#endregion

//#region test setup
fetchMock.enableMocks();
global.alert = jest.fn();
console.error = jest.fn();
console.warn = jest.fn();
console.log = jest.fn();

beforeEach(() => {
  fetchMock.resetMocks();
});

afterEach(cleanup);
//#endregion

//#region functions and objects used for testing
function renderSignUpPage() {
  return render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
}
//#endregion

//#region tests
describe("Rendering the SignUp Page", () => {
  it("renders correctly", () => {
    const page = renderSignUpPage();
    expect(page).toMatchSnapshot();
  });

  it("renders the email input field", () => {
    const { queryByTestId } = renderSignUpPage();
    expect(queryByTestId("Email textbox")).not.toBeNull();
  });

  it("renders the retype email input field", () => {
    const { queryByTestId } = renderSignUpPage();
    expect(queryByTestId("Retype Email textbox")).not.toBeNull();
  });

  it("renders the password input field", () => {
    const { queryByTestId } = renderSignUpPage();
    expect(queryByTestId("Password textbox")).not.toBeNull();
  });

  it("renders the sign up button", () => {
    const { queryByTestId } = renderSignUpPage();
    expect(queryByTestId("Sign up-button")).not.toBeNull();
  });
});

describe("Signing up", () => {
  it("sign up with valid email and password", async () => {
    const { queryByTestId } = renderSignUpPage();
    // mock successful sign up request
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 0,
        user: {
          uid: 1,
        },
        message: "User sucessfully added!",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

    // enter an email and password and click the sign up button
    const emailInput = queryByTestId("Email textbox");
    const passwordInput = queryByTestId("Password textbox");
    const signUpButton = queryByTestId("Sign up-button");

    if (emailInput != null && passwordInput != null && signUpButton != null) {
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "12345test" } });
      fireEvent.click(signUpButton);
    }

    // check if a fetch request was sent and the user was properly redirected
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(global.alert).toBeCalled();
      expect(global.window.location.href).toContain("/dashboard");
    });
  });
});
//#endregion
