import Button from "@/components/Button";
import { Answer, Question } from "@/Types";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface SurveyQuestionProps {
  question: Question;
  showPrevious: boolean;
  showSubmit: boolean;
  selectedAnswer: Answer | null;
  setAnswer: (answer: Answer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswers: () => void;
}

interface AnswerListProps {
  answers: Answer[];
  selectedAnswer: Answer | null;
  setAnswer: (answer: Answer) => void;
}

interface ButtonSectionProps {
  disableNext: boolean;
  showPrevious: boolean;
  showSubmit: boolean;
  selectedAnswer: Answer | null;
  numAnswers: number; // number of choices for a question
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswers: () => void;
}

function AnswerList(props: AnswerListProps) {
  const { answers, selectedAnswer, setAnswer } = props;

  return answers ? (
    <ul
      id="answerContainer"
      className="w-full flex flex-col justify-center items-center gap-4"
    >
      {answers.map((elem, index) => (
        <li className="w-[60%]" key={"answer-" + index}>
          <Button
            label={elem.text}
            id={`answer-${index}${elem == selectedAnswer ? "-selected" : ""}`}
            onClick={() => {
              setAnswer(elem);
            }}
            capitalize={false}
            style={twMerge(
              "w-full min-h-[4rem] rounded-xl border-0",
              index % 2 === 0
                ? elem == selectedAnswer
                  ? "btn-primary text-white"
                  : "bg-primaryTransparent text-black hover:bg-darkPurple hover:text-white"
                : elem == selectedAnswer
                ? "btn-accent text-white"
                : "bg-accentTransparent text-black hover:bg-green hover:text-white"
            )}
          />
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
}

function ButtonSection(props: ButtonSectionProps) {
  const {
    numAnswers,
    selectedAnswer,
    nextQuestion,
    previousQuestion,
    showPrevious,
    showSubmit,
    disableNext,
    submitAnswers,
  } = props;
  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      {/* Back Button */}
      {showPrevious && (
        <Button
          label="previous"
          id="previous"
          onClick={() => {
            previousQuestion();
          }}
          style="btn w-[8rem] btn-secondary px-12 hover:bg-darkPurple transition"
        />
      )}
      {/* Next/Submit Button */}
      <Button
        label={showSubmit ? "submit" : "next"}
        id={showSubmit ? "submit" : "next"}
        onClick={
          showSubmit
            ? () => {
                submitAnswers();
              }
            : () => {
                selectedAnswer?.index !== -1 || numAnswers === 0
                  ? nextQuestion()
                  : () => {};
              }
        }
        style={twMerge(
          "btn w-[8rem] bg-green px-12 hover:bg-darkGreen transition",
          disableNext ? "btn-disabled" : ""
        )}
      />
    </div>
  );
}

export const SurveyQuestionMemo = memo(function SurveyQuestion(
  props: SurveyQuestionProps
) {
  const {
    question,
    showPrevious,
    showSubmit,
    selectedAnswer,
    setAnswer,
    nextQuestion,
    previousQuestion,
    submitAnswers,
  } = props;

  const disableNext =
    selectedAnswer == null && question.answers.length != 0 ? true : false;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-12 px-2">
      <AnswerList
        answers={question.answers}
        setAnswer={setAnswer}
        selectedAnswer={selectedAnswer}
      />
      {/* Buttons */}
      <ButtonSection
        disableNext={disableNext}
        showPrevious={showPrevious}
        showSubmit={showSubmit}
        numAnswers={question.answers.length}
        selectedAnswer={selectedAnswer}
        nextQuestion={nextQuestion}
        previousQuestion={previousQuestion}
        submitAnswers={submitAnswers}
      />
    </div>
  );
});
