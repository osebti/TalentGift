//#region imports
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

import SignIn from "@/pages/SignIn";
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
function renderSignInPage() {
  return (
    render(
      <BrowserRouter>
        <SignIn/>
      </BrowserRouter>
    )
  );
}
//#endregion

//#region tests
describe("Rendering the SignIn Page", () => {

  it("renders correctly", () => {
    const page = renderSignInPage();
    expect(page).toMatchSnapshot();
  });

  it("renders the email input field", () => {
    const { queryByTestId } = renderSignInPage();
    expect(queryByTestId("Email textbox")).not.toBeNull();
  });

  it("renders the password input field", () => {
    const { queryByTestId } = renderSignInPage();
    expect(queryByTestId("Password textbox")).not.toBeNull();
  });

  it("renders the sign in button", () => {
    const { queryByTestId } = renderSignInPage();
    expect(queryByTestId("Sign in-button")).not.toBeNull();
  });

});

describe("Signing In", () => {

  it("sign in with correct email and password", async () => {
    const { queryByTestId } = renderSignInPage();

    // mock successful sign in request
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 0,
        user: {
          uid: 1,
          oid: 1,
        },
        manager: true,
      }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

    // enter an email and password and click the sign in button
    const emailInput = queryByTestId("Email textbox");
    const passwordInput = queryByTestId("Password textbox");
    const signInButton = queryByTestId("Sign in-button");

    if (emailInput != null && passwordInput != null && signInButton != null) {
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "12345test" } });
      fireEvent.click(signInButton);
    }

    // check if a fetch request was sent and user is redirected to dashboard (successful sign in)
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(global.window.location.href).toContain("/dashboard");
    });
  });

  it("sign in with invalid email", async () => {
    const { queryByTestId, queryByText } = renderSignInPage();

    // mock unsuccessful sign in request (invalid email)
    fetchMock.mockResponseOnce(
      JSON.stringify({ status: 1 }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

    // check that error message is not already shown
    expect(queryByText("Email not recognized!")).toBeNull();

    // enter an email and password and click the sign in button
    const emailInput = queryByTestId("Email textbox");
    const passwordInput = queryByTestId("Password textbox");
    const signInButton = queryByTestId("Sign in-button");

    if (emailInput != null && passwordInput != null && signInButton != null) {
      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: "12345test" } });
      fireEvent.click(signInButton);
    }

    // check if a fetch request was sent and the correct error message was shown
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(queryByText("Email not recognized!")).not.toBeNull();
    });
  });

  it("sign in with invalid password", async () => {
    const { queryByTestId, queryByText } = renderSignInPage();

    // mock unsuccessful sign in request (invalid password)
    fetchMock.mockResponseOnce(
      JSON.stringify({ status: 2 }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

    // check that error message is not already shown
    expect(queryByText("Incorrect password!")).toBeNull();

    // enter an email and password and click the sign in button
    const emailInput = queryByTestId("Email textbox");
    const passwordInput = queryByTestId("Password textbox");
    const signInButton = queryByTestId("Sign in-button");

    if (emailInput != null && passwordInput != null && signInButton != null) {
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "" } });
      fireEvent.click(signInButton);
    }

    // check if a fetch request was sent and the correct error message was shown
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(queryByText("Incorrect password!")).not.toBeNull();
    });
  });

});
//#endregion
