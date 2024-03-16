import VennDiagram from "@/components/VennDiagram";
import ChartTitle from "@/components/ChartTitle";
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import { twMerge } from "tailwind-merge";
import { Margin, usePDF } from "react-to-pdf";
import Alert from "@/components/Alert";
import { useGlobalState } from "@/state/global";
import { useEffect, useState } from "react";
import config from "../../../config";
import { useParams } from "react-router-dom";

// interface for alerts in report notes
interface ReportAlerts {
  delegation: boolean;
  support: boolean;
  direction: boolean;
}

interface NoteProps {
  motivations: string;
  values: string;
  alerts: ReportAlerts;
  managerFeedback: string;
  manager: boolean; // true if user is a manager, false otherwise
  style?: string;
}

interface SpanTableProps {
  spanOfControl: number;
  spanOfSupport: number;
  spanOfAccountability: number;
  spanOfInfluence: number;
}

interface CompanyGapProps {
  spanOfControl: number;
  spanOfSupport: number;
  spanOfAccountability: number;
  spanOfInfluence: number;
  balanced: boolean;
}

interface GetReportProps {
  uid: string | undefined;
  loggedInUserUid: string;
  manager: boolean;
  oid: string | undefined;
}

interface ReportContentProps {
  report: Report;
  manager: boolean;
  expectations: string;
}

interface NoDataScreenProps {
  manager: boolean;
}

interface Report {
  development: string;
  managerFeedback: string;
  alerts: ReportAlerts;
  motivations: string;
  nextSteps: string;
  personality: string;
  pos_balance: number;
  values: string;
  spanOfControl: number;
  spanOfSupport: number;
  spanOfAccountability: number;
  spanOfInfluence: number;
  balanced: boolean;
}

/**
 * Renders the notes section of the report
 * @param props Arguments needed to generate the notes section of the report
 * @returns Notes section of the report
 */
function NotesSection(props: NoteProps) {
  const { motivations, values, alerts, managerFeedback, manager, style } =
    props;
  return (
    <div className={twMerge("card", style)}>
      <div className="card-body">
        <h2 className="card-title">Notes</h2>
        <ul className="text-lg">
          {/* Show manager feedback only if user is a manager */}
          {manager ? (
            <>
              <li className="list-disc">Feedback: {managerFeedback}</li>
              <li className="list-disc">Alerts:</li>
              <ul className="ml-4">
                {/* Check if alerts is defined first */}
                {alerts && alerts.delegation ? (
                  <li className="list-disc">Employee needs delegation</li>
                ) : null}
                {alerts && alerts.direction ? (
                  <li className="list-disc">Employee needs direction</li>
                ) : null}
                {alerts && alerts.support ? (
                  <li className="list-disc">Employee needs support</li>
                ) : null}
                {alerts &&
                !alerts.delegation &&
                !alerts.direction &&
                !alerts.support ? (
                  <li className="list-disc">None</li>
                ) : null}
              </ul>
            </>
          ) : null}
          <li className="list-disc">Motivations: {motivations}</li>
          <li className="list-disc">Values: {values}</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Creates a table containing score for each category in the organization GAP formula (span of control, span of support, span of accountability, span of influence)
 * @param props Arguments needed to generate the Span Table of the report (in the company GAP section)
 * @returns Table containing span scores
 */
function SpanTable(props: SpanTableProps) {
  const {
    spanOfControl,
    spanOfSupport,
    spanOfAccountability,
    spanOfInfluence,
  } = props;
  // Referenced: https://daisyui.com/components/table/
  // License: MIT License
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Category</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>Span of Control</th>
            <td className="text-primary font-bold">{spanOfControl}</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>Span of Support</th>
            <td className="text-primary font-bold">{spanOfSupport}</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>Span of Accountability</th>
            <td className="text-primary font-bold">{spanOfAccountability}</td>
          </tr>
          {/* row 4 */}
          <tr>
            <th>Span of Influence</th>
            <td className="text-primary font-bold">{spanOfInfluence}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/**
 * Renders the company GAP section of the report (table containing spans and an alert if applicable)
 * @param props Arguments needed to generate company GAP section of the report
 * @returns Company GAP section of the report
 */
function CompanyGapSection(props: CompanyGapProps) {
  const {
    spanOfControl,
    spanOfSupport,
    spanOfAccountability,
    spanOfInfluence,
    balanced,
  } = props;

  // Display message based on whether the company GAP is balanced
  // Company GAP is balanced if: |(Span of Control + Span of Support) - (Span of Accountability + Span of Influence)| <= 1
  let alert: JSX.Element;
  if (balanced) {
    alert = (
      <Alert
        message="Balanced Organization GAP"
        icon="/success_icon.svg"
        status="success"
      />
    );
  } else if (
    spanOfControl != spanOfAccountability &&
    spanOfSupport != spanOfInfluence
  ) {
    alert = (
      <Alert
        message="Focus on structure, control systems, interactive networks, and shared responsibilities"
        icon="/warning_icon.svg"
        status="error"
      />
    );
  } else if (spanOfControl != spanOfAccountability) {
    alert = (
      <Alert
        message="Focus on structure and control systems"
        icon="/warning_icon.svg"
        status="error"
      />
    );
  } else {
    alert = (
      <Alert
        message="Focus on interactive networks and shared responsibilities"
        icon="/warning_icon.svg"
        status="error"
      />
    );
  }
  return (
    <div id="company-gap" className="flex flex-col gap-4">
      <h2 className="text-secondary text-xl font-bold">Organization GAP</h2>
      <p>
        Organization GAP is determined by four factors: span of control, span of
        support, span of accountability, and span of influence.
      </p>
      <SpanTable
        spanOfControl={spanOfControl}
        spanOfSupport={spanOfSupport}
        spanOfAccountability={spanOfAccountability}
        spanOfInfluence={spanOfInfluence}
      />
      {alert}
    </div>
  );
}

/**
 * Renders content of Report page based on the report generated in GetReport
 * @param props Arguments needed to generate report
 * @returns Report page content
 */
function ReportContent(props: ReportContentProps) {
  const { report, manager, expectations } = props;
  const diagramData = [
    {
      label: "Personality",
      values: [report.personality],
    },
    {
      label: "Expectations",
      values: [expectations],
    },
  ];
  const { toPDF, targetRef } = usePDF({
    filename: "report.pdf",
    page: { margin: Margin.SMALL },
  });
  return (
    <div className="w-full px-4 md:px-8 pb-8">
      <div className="w-full grid grid-cols-2 mb-8 gap-8">
        {/** Page title */}
        <PageTitle
          id="report"
          title="Report"
          style="col-span-2 md:col-span-1 lg:col-span-1"
        />
        {/** Export to pdf button */}
        <div
          id="export-pdf-button-container"
          className="flex col-span-2 md:col-span-1 lg:col-span-1 justify-start md:justify-end lg:justify-end"
        >
          <Button
            id="export-pdf"
            label="Export to PDF"
            onClick={() => toPDF()}
            style="btn-secondary rounded-2xl"
          />
        </div>
      </div>
      <div
        ref={targetRef}
        className="grid grid-cols-2 gap-12 md:gap-8 lg:gap-6"
      >
        {/** PE venn diagram chart */}
        <div
          id="pe-container"
          className="flex flex-col gap-12 col-span-2 md:col-span-1 lg:col-span-1"
        >
          <ChartTitle
            title="Personality/Expectations Diagram"
            id="pe"
            style="text-secondary"
          />
          {/* Venn Diagram uses dummy data for now. Add real data later */}
          <VennDiagram id="pe" datasets={diagramData} />
        </div>
        {/* Report image (employees) or alerts (managers) */}
        <div
          id="alerts-container"
          className="md:block lg:block col-span-2 md:col-span-1 lg:col-span-1"
        >
          {manager ? (
            <CompanyGapSection
              spanOfControl={report.spanOfControl}
              spanOfSupport={report.spanOfSupport}
              spanOfAccountability={report.spanOfAccountability}
              spanOfInfluence={report.spanOfInfluence}
              balanced={report.balanced}
            />
          ) : (
            <img src="/report.svg"></img>
          )}
        </div>
        {/* Personality Style & Recommended Steps */}
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1 lg:col-span-1">
          <p id="personality-style">
            Based on your answers, your personality style is{" "}
            <span className="text-primary font-bold">{report.personality}</span>
          </p>
          <p id="personality-style-description">
            Learn more about your personality style{" "}
            <a
              href="https://www.discprofile.com/what-is-disc/disc-styles"
              className="text-primary font-bold underline"
            >
              here
            </a>
          </p>
        </div>
        {/** Notes */}
        <div
          id="notes-container"
          className="w-full h-full col-span-2 md:col-span-1 lg:col-span-1"
        >
          <NotesSection
            motivations={report.motivations}
            values={report.values}
            alerts={report.alerts}
            managerFeedback={report.managerFeedback}
            manager={manager}
            style="bg-primary text-primary-content min-h-[20rem] h-full"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * This function renders a no data found screen.
 * @param props Arguments needed to generate No Data screen
 * @returns A no data found screen
 */
function NoDataScreen(props: NoDataScreenProps) {
  const { manager } = props;

  const message = manager
    ? "This user has not taken a survey yet!"
    : "You have not taken a survey yet";
  return (
    <div className="flex flex-col items-center gap-3">
      <img alt="No Data Image" src="/no_data.svg" className="max-h-[24rem]" />
      <p className="text-primary text-xl">{message}</p>
    </div>
  );
}

/**
 * Renders the Report page
 * @returns The Report page
 */
export default function Report() {
  const [user] = useGlobalState("user");
  const [org] = useGlobalState("org");
  const oid = org.oid;
  const loggedInUserUid = user.uid;
  const manager = user.manager;
  const { uid } = useParams(); // uid of user report you are viewing
  const emptyReport: Report = {
    development: "",
    managerFeedback: "",
    alerts: { delegation: false, direction: false, support: false },
    motivations: "",
    nextSteps: "",
    personality: "",
    pos_balance: 0,
    values: "",
    spanOfControl: 0,
    spanOfSupport: 0,
    spanOfAccountability: 0,
    spanOfInfluence: 0,
    balanced: true,
  };
  const [report, setReport] = useState(emptyReport);
  const [expectations, setExpectations] = useState("");
  const [dataRetrieved, setDataRetrieved] = useState(false);

  // Fetch report content from appropriate endpoint
  useEffect(() => {
    async function GetReport(props: GetReportProps) {
      const { uid, manager, oid } = props;

      let reportResponse: Response;
      if (manager && loggedInUserUid === uid) {
        // Case 1: User is a manager and they are viewing their own report
        reportResponse = await fetch(
          `http://${config.hostname}/reports/managerReport?uid=${loggedInUserUid}`
        );
      } else if (manager) {
        // Case 2: User is a manager viewing an employee's report
        reportResponse = await fetch(
          `http://${config.hostname}/reports/managerReport?uid=${uid}`
        );
      } else {
        // Case 3: User is an employee viewing their own report
        reportResponse = await fetch(
          `http://${config.hostname}/reports/individualReport?uid=${loggedInUserUid}`
        );
      }
      if (reportResponse.status === 200) {
        const report = await reportResponse.json();
        console.log(report);
        setReport(report);

        // Get expectations for Venn diagram
        const expectationsResponse = await fetch(
          `http://${config.hostname}/reports/expectations?oid=${oid}`
        )

        if (expectationsResponse.status === 200) {
          const expectations = await expectationsResponse.text();
          console.log(expectations);
          setExpectations(expectations);
        }
      }
      setDataRetrieved(true);
    }
    GetReport({ uid, loggedInUserUid, manager, oid });
  }, [uid, loggedInUserUid, manager, oid]);

  return (
    <>
      {dataRetrieved ? (
        <>
          {JSON.stringify(report) !== JSON.stringify(emptyReport) ? (
            <ReportContent manager={manager} report={report} expectations={expectations} />
          ) : (
            <NoDataScreen manager={manager} />
          )}
        </>
      ) : null}
    </>
  );
}
