//#region import
// components
import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import { useGlobalState } from "@/state/global";
import Alert from "@/components/Alert";
import { useEffect, useState } from "react";
import { Margin, usePDF } from "react-to-pdf";
import config from "../../../config";
//#endregion

//#region types & interfaces
interface CriticalPositionProps {
  positionName: string;
  criticalPositions: number[];
}

interface GetReportProps {
  uid: string;
  oid: string;
}

interface CriticalPosition {
  role: string;
  criticalpositions: number[];
}

interface Report {
  businessStrategy: string;
  leadershipStyle: string;
}

//#endregion

//#region fragment component

/**
 * Renders a button to create an organization
 * @returns Create organization button
 */
function CreateOrgButton() {
  return (
    <Button
      id="create-org"
      label="Create an Organization"
      href="/dashboard/create-org"
      navigate
      style="btn-secondary rounded-2xl mx-4 md:mx-8"
    />
  );
}

/**
 * Renders a button to take an organization survey
 * @returns Take organization survey button
 */
function TakeOrgSurveyButton() {
  return (
    <Button
      id="take-org-survey"
      label="Take Organization Survey"
      href="/dashboard/org-survey"
      navigate
      style="btn-secondary rounded-2xl mx-4 md:mx-8"
    />
  );
}

/**
 * Renders a button to add critical positions to an organization (redirect to Add Members page)
 * @returns Add critical positions button
 */
function AddCriticalPositionsButton() {
  return (
    <Button
      id="add-critical-positions"
      label="Add Critical Positions"
      href="/dashboard/add-members"
      navigate
      style="btn-secondary rounded-2xl"
    />
  )
}

/**
 * Renders a critical position component
 * @param props Arguments needed to display a critical position
 * @returns Critical position component
 */
function CriticalPosition(props: CriticalPositionProps) {
  const { positionName, criticalPositions } = props;
  console.log(positionName);
  console.log(criticalPositions);

  const sumOfCriticalPositions = criticalPositions.reduce((a, b) => a + b, 0);

  let positionType: string; // basic position, somewhat critical, highly critical
  let status: string; // determines colour of alert

  if (sumOfCriticalPositions >= 10) {
    positionType = "highly critical";
    status = "error";
  } else if (sumOfCriticalPositions >= 6) {
    positionType = "somewhat critical";
    status = "warning";
  } else {
    positionType = "basic";
    status = "success";
  }

  return (
    <Alert
      message={`${positionName} is a ${positionType} position`}
      icon="/person.svg"
      status={status}
    />
  );
}

/**
 * Creates an organization report
 * @returns Organization Report page
 */
export default function Overview() {
  //const businessStrategy = "Agility with Influence"; // temporary
  //const leadershipStyle = "coaching style"; // temporary
  const uid = useGlobalState("user")[0].uid;
  const oid = useGlobalState("org")[0].oid;
  const manager = useGlobalState("user")[0].manager;

  const emptyReport: Report = {
    businessStrategy: "",
    leadershipStyle: "",
  };
  const [report, setReport] = useState(emptyReport);
  const [loading, setLoading] = useState(true); // temporary, remove when fetching from database
  const [showSurvey, setShowSurvey] = useState(true); // temporary, remove when fetching from database
  const emptyArray: CriticalPosition[] = [];
  const [criticalPositions, setCriticalPositions] = useState(emptyArray);

  const AddCriticalPositions = (
    <>
      {/* Display Add Critical Positions button if organization has no critical positions */}
      <div className="flex justify-start">
        <AddCriticalPositionsButton />
      </div>
    </>
  )

  useEffect(() => {
    async function GetReport(props: GetReportProps) {
      const { oid } = props;

      // Retrieve critical positions from database
      const criticalPositionsResponse = await fetch(
        `http://${config.hostname}/reports/criticalPositions?oid=${oid}`
      );
      if (criticalPositionsResponse.status !== 404) {
        const criticalPositions = await criticalPositionsResponse.json();
        console.log(criticalPositions);
        setCriticalPositions(criticalPositions);
      }

      // Retrieve business strategy and leadership style
      const reportResponse = await fetch(
        `http://${config.hostname}/reports/organizationReport?oid=${oid}`
      ); // sid of 2 denotes an organization report
      if (reportResponse.status !== 404) {
        const report = await reportResponse.json();
        console.log(report);
        setReport(report);
        setShowSurvey(false);
      }
    }
    GetReport({ uid, oid });
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Export report to PDF
  const { toPDF, targetRef } = usePDF({
    filename: "organization_report.pdf",
    page: { margin: Margin.SMALL },
  });

  const ManagerReport = (
    <>
      <div
        id="org-report-header"
        className="flex gap-2 justify-between mb-8 px-12"
      >
        <PageTitle id="org-report" title="Organization Report" />
        <Button
          id="export-pdf"
          label="Export to PDF"
          onClick={() => toPDF()}
          style="btn-secondary rounded-2xl"
        />
      </div>
      <div
        id="org-report-content"
        className="flex flex-col gap-4 px-12"
        ref={targetRef}
      >
        <div id="business-strategy">
          <p>
            Based on your answers, your suggested business strategy is{" "}
            <span className="text-primary font-bold">
              {report.businessStrategy}
            </span>
          </p>
        </div>
        <div id="leadership-style">
          <p>
            It is recommended that your leaders use a{" "}
            <span className="text-primary font-bold">
              {report.leadershipStyle}
            </span>{" "}
            of leadership
          </p>
        </div>
        {/* Critical Positions currently uses hardcoded data from positions-data.json */}
        <div id="critical-positions" className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">Critical Positions</h2>
          <p>Based on your strategy, these are your critical positions:</p>
          {/* Show critical positions if applicable. Display add critical positions button if no critical positions found */}
          {criticalPositions.length > 0 ? 
            <>
              {criticalPositions.map((position, index) => {
                return (
                  <CriticalPosition
                    positionName={position.role}
                    criticalPositions={position.criticalpositions}
                    key={index}
                  />
                );
              })} 
            </> : AddCriticalPositions}
        </div>
      </div>
    </>
  );

  const TakeOrgSurvey = (
    <>
      <div className="flex justify-center">
        <TakeOrgSurveyButton />
      </div>
    </>
  );

  const CreateOrg = (
    <>
      {/* Display Create Organization button if user is not a manager */}
      <div className="flex justify-center">
        <CreateOrgButton />
      </div>
    </>
  )

  const Content = showSurvey ? TakeOrgSurvey : ManagerReport;
  return (
    <>
      {manager ? (
        loading ?
          <></>
          :
          Content
      ) : (
        CreateOrg
      )}
    </>
  );
}
