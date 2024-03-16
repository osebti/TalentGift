import questionBank from "@/data/question-bank.json";
import { Reducer, useEffect, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyQuestionMemo } from "./Questions";
import { Answer } from "@/Types";
import NotificationButton from "@/components/NotificationButton";
import { useGlobalState } from "@/state/global";
import config from "../../../../config.js";



interface SurveyState {
  levelIndex: number;
  questionIndex: number;
  answers: Answer[][];
}

interface QuestionHeaderProps {
  level: string;
  levelIndex: number;
  questionIndex: number;
  question: string;
}


function QuestionHeader(props: QuestionHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center">
      <h1
        className="text-2xl lg:text-4xl font-bold text-darkPurple"
        data-testid={`level-header-${props.levelIndex}`}
      >
        {props.level}
      </h1>
      <p
        className="lg:max-w-[50%] max-w-[75%] text-center text-md lg:text-xl"
        data-testid={`question-description-${props.levelIndex}-${props.questionIndex}`}
      >
        {props.question}
      </p>
    </div>
  );
}


export default function Survey(props: {companySurvey?: boolean}) {
  const {companySurvey = false} = props;
  const navigate = useNavigate();
  const [user] = useGlobalState("user");
  const uid = user.uid;
  const [org] = useGlobalState("org")
  const oid = org.oid;
  const manager = user.manager;

  const [state, setState] = useReducer<
    Reducer<SurveyState, Partial<SurveyState>>
  >((state, newState) => ({ ...state, ...newState }), {
    levelIndex: 0,
    questionIndex: 0,
    answers: [[]],
  });

  /* Add appropriate questions depending on whether the survey is a user survey
   * or a company survey */
  const questions = useMemo(() => {
    if (companySurvey) {
      return questionBank.company;
    } else if (manager) {
      return [...questionBank.user, ...questionBank.managers];
    } else {
      return [...questionBank.user, ...questionBank.employees];
    }
  }, [companySurvey, manager]);

  const showPrevious = useMemo(() => {
    if (companySurvey && state.questionIndex != 0) {
      return true
    } else {
      return state.levelIndex != 0 ? true : false
    }
  },[companySurvey, state.levelIndex, state.questionIndex])

  const currentQuestion =
    questions[state.levelIndex].questions[state.questionIndex];

  const showSubmit =
    state.levelIndex == questions.length - 1 &&
    state.questionIndex == questions[state.levelIndex].questions.length - 1
      ? true
      : false;

  useEffect(() => {
    const tempAnswers: Answer[][] = [];
    questions.forEach((level) => {
      const tempAgain: Answer[] = [];
      level.questions.forEach(() => {
        tempAgain.push({ text: "", index: -1 });
      });
      tempAnswers.push(tempAgain);
    });

    setState({ answers: tempAnswers });
  }, [questions]);

  const nextQuestion = () => {
    if (
      state.questionIndex ==
      questions[state.levelIndex].questions.length - 1
    ) {
      setState({ levelIndex: state.levelIndex + 1, questionIndex: 0 });
    } else {
      setState({ questionIndex: state.questionIndex + 1 });
    }
  };

  const previousQuestion = () => {
    if (state.questionIndex == 0) {
      setState({
        levelIndex: state.levelIndex - 1,
        questionIndex: questions[state.levelIndex - 1].questions.length - 1,
      });
    } else {
      setState({ questionIndex: state.questionIndex - 1 });
    }
  };

  const setAnswer = (answer: Answer) => {
    const updatedAnswers = state.answers;
    updatedAnswers[state.levelIndex][state.questionIndex] = answer;
    setState({ answers: updatedAnswers });
  };

  // Formats for database
  const submitAnswers = () => {
    const answerPackage = [];
    console.log(state.answers);
    for (let i = 0; i < state.answers.length; i++) {
      for (let j = 0; j < state.answers[i].length; j++) {
        if (state.answers[i][j] != null) {
          answerPackage.push(state.answers[i][j].index);
        }
      }
    }
    console.log("Answer Package: ", answerPackage);

    fetch(`http://${config.hostname}/surveys/take_survey`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Survey_id: companySurvey ? 2: 1, // temporary
        oid: oid,
        Employee_id: uid,
        Answers: answerPackage,
      }),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/success", {
          state: {
            message: "Survey Submitted!",
            returnAddress: companySurvey ? '/dashboard' : `/dashboard/report/${uid}`,
            returnName: "Report",
          },
        });
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-12 px-2 align-middle pb-8">
      <div className="self-end pr-2">
        {state.levelIndex === 0 && manager && !companySurvey ? <NotificationButton /> : null}
      </div>
      <div className="flex justify-center">
        <QuestionHeader
          level={questions[state.levelIndex].level}
          levelIndex={state.levelIndex}
          questionIndex={state.questionIndex}
          question={currentQuestion.question}
        />
      </div>
      <SurveyQuestionMemo
        question={currentQuestion}
        showPrevious={showPrevious}
        showSubmit={showSubmit}
        selectedAnswer={state.answers[state.levelIndex][state.questionIndex]}
        setAnswer={setAnswer}
        nextQuestion={nextQuestion}
        previousQuestion={previousQuestion}
        submitAnswers={submitAnswers}
      />
      {currentQuestion?.img?.src && (
        <img
          className="mt-12 w-40% sm:max-w-[32rem] md:w-30% lg:w-20% object-contain"
          data-testid={`question-image-${state.levelIndex}-${state.questionIndex}`}
          {...currentQuestion.img}
        />
      )}
    </div>
  );
}
