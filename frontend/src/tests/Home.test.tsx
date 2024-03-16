import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "@/pages/Home";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

function renderHomePage() {
  return (
    render(
      <BrowserRouter>
        <Home/>
      </BrowserRouter>
    )
  );
}

describe("Rendering the Landing Page", () => {

  it("renders correctly", () => {
    const page = renderHomePage();
    expect(page).toMatchSnapshot();
  });
  
  it("renders sign in button", () => {
    const { queryByTestId } = renderHomePage();
    expect(queryByTestId("Sign In-button")).not.toBeNull();
  });

  it("renders sign up button", () => {
    const { queryByTestId } = renderHomePage();
    expect(queryByTestId("Sign Up-button")).not.toBeNull();
  });

});

describe("Landing Page Navigation", () => {
  
  it("directs to sign in page when sign in button is clicked", () => {
    const { queryByText } = renderHomePage();
    // click on sign in button
    const signInButton = queryByText("Sign In");
    if (signInButton != null) {
      fireEvent.click(signInButton);
    }
    // check if site navigates to correct address
    expect(global.window.location.href).toContain("/sign-in");
  });

  it("directs to sign up page when sign up button is clicked", () => {
    const { queryByText } = renderHomePage();
    // click on sign up button
    const signUpButton = queryByText("Sign Up");
    if (signUpButton != null) {
      fireEvent.click(signUpButton);
    }
    // check if site navigates to correct address
    expect(global.window.location.href).toContain("/sign-up");
  });
  
});
