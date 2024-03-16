import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Survey from "@/pages/Survey/Survey";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

// Tests for Survey.tsx
// Testing:
// - Survey Rendering (header, question, images)
// - Survey Methods (next, previous, setAnswer)
// - Survey Submit (submit button, submitAnswers)

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Survey Rendering", () => {
  it("renders correctly", () => {
    const page = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    expect(page).toMatchSnapshot();
  });

  it("renders header", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    expect(queryByTestId("level-header-0")).not.toBeNull();
  });

  it("renders question", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    expect(queryByTestId("question-description-0-0")).not.toBeNull();
  });

  it("renders images", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    expect(queryByTestId("question-image-0-0")).not.toBeNull();
  });
});

describe("Survey Methods", () => {
  it("shows next level when next button is clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    expect(queryByTestId("next-button")).not.toBeNull();
    fireEvent.click(getByTestId("next-button"));
    expect(queryByTestId("level-header-1")).not.toBeNull();
  });

  it("shows next question when next button is clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("next-button"));
    expect(queryByTestId("question-description-1-0")).not.toBeNull();
    fireEvent.click(getByTestId("answer-0-button")); // select first answer
    fireEvent.click(getByTestId("next-button"));
    expect(queryByTestId("question-description-1-1")).not.toBeNull();
  });

  it("shows previous level when previous button is clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("next-button"));
    expect(queryByTestId("level-header-1")).not.toBeNull();
    fireEvent.click(getByTestId("previous-button"));
    expect(queryByTestId("level-header-0")).not.toBeNull();
  });

  it("shows previous question when next button is clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("next-button"));
    fireEvent.click(getByTestId("answer-0-button")); // select first answer
    fireEvent.click(getByTestId("next-button"));
    expect(queryByTestId("question-description-1-1")).not.toBeNull();
    fireEvent.click(getByTestId("previous-button"));
    expect(queryByTestId("question-description-1-0")).not.toBeNull();
  });

  it("should setAnswer when answer is selected", () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId("next-button"));
    fireEvent.click(getByTestId("answer-0-button"));
    expect(queryByTestId("answer-0-button")).toBeNull();
    expect(queryByTestId("answer-0-selected-button")).not.toBeNull();
  });
});

describe("Survey Submit", () => {
  it("should show submit button when last question is answered", () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );

    while (queryByTestId("next-button")) {
      fireEvent.click(getByTestId("next-button"));
      if (queryByTestId("answer-0-button")) {
        fireEvent.click(getByTestId("answer-0-button"));
      }
    }

    expect(queryByTestId("submit-button")).not.toBeNull();
  });

  it("should submit answers when submit button is clicked", async () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Survey />
      </BrowserRouter>
    );

    while (queryByTestId("next-button")) {
      fireEvent.click(getByTestId("next-button"));
      if (queryByTestId("answer-0-button")) {
        fireEvent.click(getByTestId("answer-0-button"));
      }
    }
    expect(queryByTestId("submit-button")).not.toBeNull();
    fireEvent.click(getByTestId("submit-button"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    })
  });
});
