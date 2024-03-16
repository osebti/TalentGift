# Meeting Minutes

## September 20, 2023, 9:00 am

CSC B-10

### Agenda

- Go over expectations for Sprint 1
- Discuss what technologies and tools will be used for the project

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Thea Nguyen
- Steven Heung (TA)

### Minutes

#### Project Preparation

- Book a meeting with the client as soon as possible!
- Discussed what needs to be submitted for Sprint 1
- Steven explained how Continous Integration (CI) works to the members who were not familiar with it
- Discussed potential ideas for our tech stack (frontend, backend, database)
  > - It is recommended that we use either PostgreSQL or MySQL for the database
- We added Steven to our Discord server so we can easily communicate with each other

### Action Items

| **Member**           | **Tasks**                                                     |
| -------------------- | ------------------------------------------------------------- |
| Alexander Nguyen     | Prepare questions for tomorrow’s meeting                      |
| Irene Sun            | Prepare questions for tomorrow’s meeting                      |
| Jaskirat Singh Saggu | Prepare questions for tomorrow’s meeting                      |
| Leah Sheptycki       | Prepare questions for tomorrow’s meeting                      |
| Othman Sebti         | Prepare questions for tomorrow’s meeting                      |
| Thea Nguyen          | Book client meeting, Prepare questions for tomorrow’s meeting |

## September 21, 2023, 9:00 am

via Google Meet

### Agenda

- Develop a better understanding of the client’s needs
- Ask questions to the client

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Othman Sebti
- Thea Nguyen
- Steven Heung (TA)
- Yohana Soto (Client)

### Minutes

#### General

- The client approves of developing a web app
- Better to stick with a standard username/password authentication system
  > - Google Authentication might be a could have (should not be prioritized over main functionality)
- The surveys will be created inside the web application. We will provide templates
- The client is looking for feedback from the team throughout the project
- Meetings with the client will happen bi-weekly on Thursday

#### Colour Palette

- The client has a colour palette preference (innovative, colourful) that will communicated to the team

#### Goal of the Project

- In Theory: The company and employees are cooperative and have the same goals
- Reality: The company and employees have different goals resulting in a loss of time and profit
- Goal of Project: Shift company and employee goals in the same direction. Provide a plan for people to achieve their career goals (desires). Provide feedback (e.g. metrics) to companies to allow them to change before they lose time/profit or worse their talented employees
- Help employees connect with non-traditional companies which provide a different style of leadership

### Action Items

| **Member**           | **Tasks**                                                                  |
| -------------------- | -------------------------------------------------------------------------- |
| Alexander Nguyen     | Create user stories for Wednesday’s meeting, work on Sprint 1 requirements |
| Irene Sun            | Create user stories for Wednesday’s meeting, work on Sprint 1 requirements |
| Jaskirat Singh Saggu | Create user stories for Wednesday’s meeting, work on Sprint 1 requirements |
| Leah Sheptycki       | Create user stories for Wednesday’s meeting, work on Sprint 1 requirements |
| Othman Sebti         | Create user stories for Wednesday’s meeting, work on Sprint 1 requirements |
| Thea Nguyen          | Create user stories for Wednesday’s meeting, work on Sprint 1 requirements |

## September 25, 2023, 9:00 am

via Google Meet

### Agenda

- Discuss project requirements
- Go over wireframe

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Thea Nguyen

### Minutes

#### Project Requirements

- We discussed some contradictions in the functional requirements
  > - Employee should also have sign up/sign in functionality (not specified in functional requirements)
  > - Website application information and methods should be available to managers and employees (not just managers)
  > - Multiple organizations can use the application (need a way to differentiate companies)
  > - There may be too many reports to do (employee, per survey, company). Determine which surveys are the most important for the MVP
- We will follow up with the client to determine if our proposed changes are acceptable

#### Wireframe

- We went over Thea's wireframe
- We discussed use cases for both managers and employees
- Discussed how employees and managers can create an account and sign into the app
  > - Use email/password for authentication with an option for Google authentication
- Discussed how surveys will be created
  > - Each survey should have a description and a list of questions
  > - Each question is of a specific category (e.g. multiple choice, short answer)
- Discussed how results will be displayed to employees and managers
  > - Each report will have graphs for each metric to be measured by a survey

### Action Items

| **Member**           | **Tasks**                                           |
| -------------------- | --------------------------------------------------- |
| Alexander Nguyen     | Work on project plan, finish teamwork documentation |
| Irene Sun            | Work on story map, MoSCoW                           |
| Jaskirat Singh Saggu | Work on project plan, finish teamwork documentation |
| Leah Sheptycki       | Work on sequence diagram, architecture diagram      |
| Othman Sebti         | Work on sequence diagram, architecture diagram      |
| Thea Nguyen          | Work on story map, MoSCoW                           |

## September 27, 2023, 9:00 am

CSC B-10

### Agenda

- Report progress on Sprint 1 requirements
- Get feedback on completed Sprint 1 requirements

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Othman Sebti
- Thea Nguyen
- Steven Heung (TA)

### Minutes

- Since we did not have anything important in our main branch, we can just rename our default branch to main (default branch should be main or master by convention)
  > - Set up main branch protection
  > - Avoid diverging branches
- User stories mostly look good. Be sure that each user story represents one action the user can take (avoid epics)
  > - User stories should be looked at by the entire team (have a team meeting to go over user stories)
- Documentation should be stored as markdown files in /docs folder (recommended that we use MkDocs)

### Action Items

| **Member**           | **Tasks**                                 |
| -------------------- | ----------------------------------------- |
| Alexander Nguyen     | User Stories, Project Plan, Deploy MkDocs |
| Irene Sun            | User Stories                              |
| Jaskirat Singh Saggu | User Stories, Story Map                   |
| Leah Sheptycki       | User Stories, Sequence Diagram            |
| Othman Sebti         | User Stories                              |
| Thea Nguyen          | User Stories, Low Fidelity User Interface |

## September 28, 2023, 9:45 am

via Google Meet

### Agenda

- Client will give a presentation about how Talent Gift works
- Present wireframe to client and get their feedback
- Ensure client has wireframe and user stories so she can provide feedback

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Thea Nguyen
- Yohana Soto (Client)

### Minutes

#### Client Presentation

- Talent Gift has 3 primary users:
  > - Business Leaders
  > - Employees
  > - Business Person
- Survey to check for business strategy (closed questions)
  > - What is the main goal of the business?
  > - After releasing the survey, employees go through a game scenario survey
  >   > - Employees will receive a report after the survey.
  >   > - Leader goes through the same survey, the will receive alerts after the survey
- Value Proposition -> open question (long answer)
- Employees will receive email invite to participate in a “game scenario” (‘fun’ survey -> closed questions)
  > - Begin with adventure prompt
  > - Most questions (~90%) are closed questions (multiple choice). Some questions will be open questions (~10%)
  > - Personality style given at the end of the survey
  >   > - Current position
  >   > - Recommended steps
- Recommended steps (report) based on responses
- Final results will distribute people into 3 groups
- Survey questions that need to be addressed:
  > - How reports look
  > - What is included in each survey
  > - How every survey connects with other surveys
- Client will share documentation (sample survey content, presentation) with us on Monday
- Presented Game Scenario (for employees):
  > - Choose outfit as a marine
  > - Choose avatar
  > - Question: Ship has sailed. Where do we work?
  > - Question: What kind of environment do you want to work in (fast paced or by yourself)
  > - Choose talent, superpower
  > - Lots of chapters
  > - Essentially a survey being presented via a game

#### Wireframe Feedback

- Each employee should be able to go back and edit their answers to each survey (only edit answers to their own survey)
  > - If the deadline passes, no changes can be made
- Client is satisfied with the big picture of the wireframe. She will leave comments on the wireframe to clarify any missing features and her suggestions to improve the design

#### Q/A

- How many reports should be implemented?
  > - 3 reports (employee, leader, business)
- Can managers make surveys for other managers?
  > - This might be too ambitious for the first version of the app (would like but won’t get)

### Action Items

| **Member**           | **Tasks**                                                                       |
| -------------------- | ------------------------------------------------------------------------------- |
| Alexander Nguyen     | User Stories, Project Plan (verify with team), Deploy MkDocs, Plan for Sprint 2 |
| Irene Sun            | User Stories, Plan for Sprint 2                                                 |
| Jaskirat Singh Saggu | User Stories, Plan for Sprint 2                                                 |
| Leah Sheptycki       | User Stories, Sequence Diagram, Plan for Sprint 2                               |
| Othman Sebti         | User Stories, Plan for Sprint 2                                                 |
| Thea Nguyen          | User Stories, Plan for Sprint 2                                                 |

## October 4, 2023, 9:00 am

CSC B-10

### Agenda

- Demo Sprint 1 requirements to TA and get feedback
- Discuss Sprint 2 tasks
- Go over SQL tables for the project

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Thea Nguyen
- Steven Heung (TA)

### Minutes

#### Sprint 1 Demo

- Steven had some minor suggestions for how to improve our documentation. Overall, he was satisfied with our work for Sprint 1.

#### Sprint 2 Tasks

- We need to book another client meeting to go over Yohana's feedback on our user stories, and clarify how reports should look.
- This sprint seems quite heavy for the frontend people. The backend people should try to complete their tasks efficiently then provide assistance to the frontend people.

### SQL Tables

- Managers and employees are both considered Users in the database. For the codebase, we should create seperate classes/modules for managers and employees
- If a manager wishes to delete their account, they must also delete the organization they manage (this is an edge case).
- We agreed that statistics should be stored in the database rather than be recalculated every time a user accesses a report

### Action Items

| **Member**           | **Tasks**                                                         |
| -------------------- | ----------------------------------------------------------------- |
| Alexander Nguyen     | Setup Cybera and GitHub actions, Sign In using Email              |
| Irene Sun            | JSX/CSS for taking surveys, REST API endpoints for taking surveys |
| Jaskirat Singh Saggu | REST API endpoints for creating surveys                           |
| Leah Sheptycki       | JSX/CSS for login                                                 |
| Othman Sebti         | Sign Up using Email                                               |
| Thea Nguyen          | JSX/CSS for taking surveys                                        |

## October 5, 2023, 9:00 am

via Google Meet

### Agenda

- Clarification about user story feedback
- Discuss what content should be included in the reports

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Thea Nguyen
- Yohana Soto (Client)

### Minutes

#### User Stories

- Allow the manager to upload info about the company (what kind of employees, name, email, id, position)
  > - What are the critical positions in the company (HR, accountants, etc.)
- Manager creates the company and uploads information about their employees (via Excel)
  > - Need to be able to process Excel sheets with names, emails, id, question answers (Yes/No). The client wants managers to be able to add many employees at once
  > - Employees cannot upload an Excel sheet
- Use the same survey for managers and employees (1 large survey)
  > - Need to be able to add/delete questions
  > - Users can change their answers
  > - Manager can create one survey
  > - Manager can ask another manager about an employee, share surveys
- Employees can apply for positions at a company based on their survey results
- After employees complete the survey, they are able to make a decision
- User stories need to be updated to reflect insights from today’s meeting
- Key Steps for App:
  > - 1: Take a Survey
  > - 2: Get report
  > - 3: Make an action

#### Reports

- 1 report for each user (company, employee, manager)
- Put users into groups based on answers
- Need to connect report to the surveys
- Graph information based on user answers (each user answer leads to a specific outcome, given on Excel sheet presented by client)
- Based on the manager’s answers, the app will give a business strategy
- Each employee takes a survey and based on their answers, the app will show the positions employees would be a good fit for
- The app will show if an employee is aligned with the company’s business strategy (through Venn diagram, Company GAP)
- Company GAP (numerical score -> percentage) = engage rate + fit rate + … (each variable has a weighting, some are more important than others)
- We will implement the Venn Diagram, but not the Radar Chart (to avoid overwhelming managers)

### Action Items

| **Member**           | **Tasks**                                                         |
| -------------------- | ----------------------------------------------------------------- |
| Alexander Nguyen     | Setup Cybera and GitHub actions, Sign In using Email              |
| Irene Sun            | JSX/CSS for taking surveys, REST API endpoints for taking surveys |
| Jaskirat Singh Saggu | REST API endpoints for creating surveys                           |
| Leah Sheptycki       | JSX/CSS for login                                                 |
| Othman Sebti         | Sign Up using Email                                               |
| Thea Nguyen          | JSX/CSS for taking surveys                                        |

## October 9, 2023, 4:00 pm

via Discord

### Agenda

- Go over work completed so far for Sprint 2
- Create a ssl certification in Cybera (for HTTPS protocol)

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Thea Nguyen

### Minutes

#### General

- We went over what has been completed for Sprint 2 and what still needs to be done
- Sprint tasks need to be split more evenly in future sprints. Leah is content with her workload even though she has the heaviest workload this sprint

#### SSL Certification

- We had trouble creating the ssl certification using the instance created in Cybera. Othman will look into it and will report back to the team if he finds a potential solution to our issues

### Action Items

| **Member**           | **Tasks**                                                             |
| -------------------- | --------------------------------------------------------------------- |
| Alexander Nguyen     | Integrate sign in frontend with backend, write unit tests             |
| Irene Sun            | JSX/CSS for taking surveys, REST API endpoints for taking surveys     |
| Jaskirat Singh Saggu | REST API endpoints for creating surveys                               |
| Leah Sheptycki       | JSX/CSS for survey creation, UML class diagram                        |
| Othman Sebti         | Investigate ssl certificate issues, sign up using email functionality |
| Thea Nguyen          | JSX/CSS for taking surveys                                            |

## October 11, 2023, 9:00 am

CSC B-10

### Agenda

- Go over Sprint 1 feedback
- Address what still needs to be done for Sprint 2
- Clarify the tech stack used for the backend

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Thea Nguyen
- Steven Heung (TA)

### Minutes

#### Sprint 1 Feedback

- We did very well on Sprint 1! We went over a couple minor revisions that need to be made for Sprint 2 (see Sprint 1 feedback on Discord).

#### Sprint 2 Requirements

- Address all feedback from Sprint 1 and update the documentation so that it matches the current state of the project
- Be sure to add test cases (at least 1 for each module)
- Make sure the codebase is well documented (at minimum a header comment is needed for each file explaining what the file is for)
- For Sprint 2, UI tests are not a priority (they need to be present in Sprint 3, at least to some extent)

#### Tech Stack Clarification

- There was a disagreement about what technologies should be used for the backend (Node.js + SQL queries VS Next.js + Prisma ORM) that we discussed
- We ultimately decided to use Node.js for our backend instead of Next.js which was originally proposed in Sprint 1. Irene’s work (she used Next.js) needs to be refactored to use Node.js (Alex will work on this)
- We need a clear division between frontend and backend teams. Choose a team lead for each team.

### Action Items

| **Member**           | **Tasks**                                                                        |
| -------------------- | -------------------------------------------------------------------------------- |
| Alexander Nguyen     | Refactor Irene's code, Integrate sign in frontend with backend, write unit tests |
| Irene Sun            | JSX/CSS for taking surveys, Update documentation                                 |
| Jaskirat Singh Saggu | REST API endpoints for creating surveys                                          |
| Leah Sheptycki       | JSX/CSS for survey creation, UML class diagram                                   |
| Othman Sebti         | Set up PostgreSQL server key, write unit tests                                   |
| Thea Nguyen          | Refactor codebase to split frontend/backend, JSX/CSS for taking surveys          |

## October 18, 2023, 9:00 am

CSC B-10

### Agenda

- Demo Sprint 2 deliverables
- Revise Sprint 3 project plan since Thea dropped the course

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Steven Heung (TA)

### Minutes

#### Sprint 2 Demo - Codebase Feedback

- Add retype password functionality
- Red box highlighting for incorrect credentials rather than window alerts (consistent UI)
- Add README.md to GitHub
- 2 Workflows (1 for frontend, 1 for backend), be sure GitHub actions is fixed for in next sprint)

#### Sprint 2 Demo - UML Feedback

- No 1-to-1 multiplicities for inheritance
- Change “Answer” class to “Answers”
- Dashed line for “Results” interface does not show properly

#### Sprint 3 Planning

- Alex and Irene will take the user stories Thea was going to work on
- Alex has been removed from the REST API endpoint tasks

### Action Items

| **Member**           | **Tasks**                                                       |
| -------------------- | --------------------------------------------------------------- |
| Alexander Nguyen     | Add/delete members from organization                            |
| Irene Sun            | TSX/CSS for organization members                                |
| Jaskirat Singh Saggu | Create organization, set organization visibility                |
| Leah Sheptycki       | TSX/CSS for survey creation                                     |
| Othman Sebti         | Create one time survey link, send on time survey link via email |

## October 25, 2023, 9:00 am

CSC B-10

### Agenda

- Address Sprint 2 feedback

### Attendees

- Alexander Nguyen
- Irene Sun
- Othman Sebti
- Steven Heung (TA)

### Minutes

#### General

- All team members need to be present for team meetings (includes lab meetings). We will likely lose marks this sprint for attendance

#### Sprint 2 Feedback

- The file specified in the Sprint 2 feedback (under "Code is well structured and organized") is server.js (in backend directory). Refactor this file (will have less merge conflicts after refactoring)
- Name your GitHub Actions workflows differently so you can easily differentiate them
- Ensure you close issues for completed user stories (be consistent with the project plan)

### Action Items

| **Member**           | **Tasks**                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Alexander Nguyen     | Delete members from organization (frontend + backend), TSX/CSS for individual survey reports |
| Irene Sun            | TSX/CSS for employee reports                                                                 |
| Jaskirat Singh Saggu | Create organization (frontend + backend), set organization visibility                        |
| Leah Sheptycki       | TSX/CSS for survey creation                                                                  |
| Othman Sebti         | Create one time survey link, send on time survey link via email                              |

## October 26, 2023, 9:45 am

via Google Meet

### Agenda

- Demo Sprint 2 functionalities to client
- Go over functionalities we are working on in Sprint 3
- Continue our discussion from last meeting about employee reports
  > - What should an employee report look like?
  > - What needs to be included?

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Yohana Soto (Client)

### Minutes

#### Sprint 2 Demo Feedback

- Demoed landing page, signup, and the initial survey functionality
  > - Account created
  > - We have a survey UI
  > - Can take a survey
  > - End of survey functionality still needed (reports)
- Yohana is a big fan of our user interface!
- She would like to have images for each question

#### Sprint 3 Plan

- Creating the survey (currently our survey is hardcoded) and reports
- Gonna focus on personality style and 'next steps' for the reports this sprint
- Focus on creating something simple but great

#### Clarification on Reports

- For now, include personality style and the next step employees can take
- 4 profiles - C, D, I, S (see DiSC personalities for more information)
  > - Cartesian Plane
  >   > - Top = Front
  >   >   > - D - Dominant (results-oriented, active, explosive people)
  >   >   > - I - Influential (connect the people)
  >   > - Bottom = Back
  >   >   > - C - Cautious (great at analysis, patient)
  >   >   > - S - Supportive (introverted, solve problems with others, glue)
- We summarized survey questions into the 4 profiles listed above

### Action Items

| **Member**           | **Tasks**                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Alexander Nguyen     | Delete members from organization (frontend + backend), TSX/CSS for individual survey reports |
| Irene Sun            | TSX/CSS for employee reports                                                                 |
| Jaskirat Singh Saggu | Create organization (frontend + backend), set organization visibility                        |
| Leah Sheptycki       | TSX/CSS for survey creation                                                                  |
| Othman Sebti         | Create one time survey link, send on time survey link via email                              |

## October 28, 2023, 4:30 pm

via Discord

### Agenda

- Assign tasks for Sprint 4
- Finalize Sprint 3 functionalities

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti

### Minutes

- We assigned tasks for Sprint 4 as a group. The team is expected to utilize the extra week we have this sprint by taking on more tasks than we each had last sprint
- We discussed the outstanding tasks that needed to be addressed before the sprint deadline including UI tests and updating the project documentation

### Action Items

| **Member**           | **Tasks**             |
| -------------------- | --------------------- |
| Alexander Nguyen     | Finish Sprint 3 tasks |
| Irene Sun            | Finish Sprint 3 tasks |
| Jaskirat Singh Saggu | Finish Sprint 3 tasks |
| Leah Sheptycki       | Finish Sprint 3 tasks |
| Othman Sebti         | Finish Sprint 3 tasks |

## November 1, 2023, 9:00 am

CSC B-10

### Agenda

- Demo Sprint 3 functionalities

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Steven Heung (TA)

### Minutes

#### Add Members

- Validate on columns (i.e. first name/last name should be string, email, position)
- Move add-members (add-members.ts) utility file to backend
- Give a preview when the Excel file is uploaded
- If there are errors, show easy to comprehend error message
- Recommendation: Give an indicator in the database if a user is added through an Excel file, so we can assign a password (check in the backend)

#### Sprint Planning

- Update sprint docs to denote which user stories are not completed

#### GitHub Actions

- The tests pass, however there is an error message that needs to be addressed

#### General

- Focus on connecting functionalities to backend next sprint
- Recommended Feature: Add pagination to reports (e.g. export to pdf)
- One Time Link Survey: Try to use a service for this

### Action Items

| **Member**           | **Tasks**                                                                 |
| -------------------- | ------------------------------------------------------------------------- |
| Alexander Nguyen     | Address feedback on add members, separate employee and manager dashboards |
| Irene Sun            | Write UI tests, refactor frontend                                         |
| Jaskirat Singh Saggu | Delete organization (frontend + backend)                                  |
| Leah Sheptycki       | Create profile page                                                       |
| Othman Sebti         | Finish one time survey link, reset password                               |

## November 2, 2023, 11:30 am

via Google Meet

### Agenda

- Demo Sprint 3 functionalities to client
- Further discuss how company GAP is calculated and how recommended steps are determined
- Q&A with client

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Yohana Soto (Client)

### Minutes

#### Sprint 3 Functionalities Demo

- Only managers should be able to delete members
- Provide a template file on Add Members page so managers know what the Excel file they need to upload should look like
- We can remove IDs from the Excel file (generate IDs in backend)
- For passwords, generate a random password, email generated password to user, user can reset password
- Add critical positions to Excel file. These critical positions should be shown in the reports.
- In the report:
  > - Rename "Goals" to "Personality"
  > - Rename "Values" to "Expectations"
- We agreed that add/edit/delete questions is outside of the scope of the MVP. We need to primarily focus on implementing the reports at this stage

#### Company Reports

- Yohana will share how to calculate company GAP in the next few days
- We will focus on implementing Questions 3, 8-11, and 13 in the "Company" sheet of the shared Excel file
- Users should be able to export reports as a PDF

### Action Items

| **Member**           | **Tasks**                                                                 |
| -------------------- | ------------------------------------------------------------------------- |
| Alexander Nguyen     | Address feedback on add members, separate employee and manager dashboards |
| Irene Sun            | Write UI tests, refactor frontend                                         |
| Jaskirat Singh Saggu | Delete organization (frontend + backend)                                  |
| Leah Sheptycki       | Create profile page                                                       |
| Othman Sebti         | Finish one time survey link, reset password                               |

## November 8, 2023, 9:00 am

CSC B-10

### Agenda

- Go over expectations for Sprint 4 release
- Set up a PostgreSQL database on Cybera

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Steven Heung (TA)

### Minutes

#### General

- Steven quickly went over what needs to be done for Sprint 4. The marking criteria is the same as Sprint 3, so there was not much to discuss
- Steven will share Sprint 3 feedback with the team by the end of the week

#### PostgreSQL Database Setup

- We set up a database on the team’s Cybera instance so that everyone can access the same database
- The URLs in the fetch requests made in the frontend need to be changed to use the IPv6 address of our instance

### Action Items

| **Member**           | **Tasks**                                                  |
| -------------------- | ---------------------------------------------------------- |
| Alexander Nguyen     | Address feedback on add members, send survey notifications |
| Irene Sun            | Export report to PDF                                       |
| Jaskirat Singh Saggu | Delete organization (frontend + backend)                   |
| Leah Sheptycki       | Create profile page                                        |
| Othman Sebti         | Finish one time survey link, reset password                |

## November 9, 2023, 11:30 am

via Google Meet

### Agenda

- Go over expectations for Sprint 4 release
- Set up a PostgreSQL database on Cybera

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Leah Sheptycki
- Othman Sebti
- Yohana Soto (Client)

### Minutes

#### Organization (Company) GAP

- Refactor Goals/Values/Competencies to Personality/Expectations/Position Balance
- Add 4 questions to employee and manager surveys. The 4 questions are similar for employees/managers, they are just worded differently
  > - Each question is rated on a scale of 1-5
- The formula (Control + Support = Accountability + Influence) should equilibrate, but of course users may answer in a way that the formula will not equilibrate
- If the formula does not equilibrate, make recommendations to the manager
- Hide which topic/title the employee/manager are answering about (e.g. Span of Control)

#### Company Reports and Survey

- Add questions to managers to determine which positions are critical for them (3 questions to determine if a position is critical or not). Add these questions to the Excel file template in the Add Members page
- Questions:
  <ol>
    <li>This position has a critical impact in operational continuity and corporate strategic development.</li>
    <li>Highly specialized position requiring expertise in rare tools or processes; demands intensive internal training due to limited availability and high skill requirements in the market.</li>
    <li>Decisions impact company revenue, resource allocation, and area budgets; influence functional processes and business structure.</li>
  </ol>
- Ask managers to rate on a scale of 1 to 5 (1 = basic position; 5 = highly critical position)
- Sum up all 3 answers:
  > - 10-15 = Highly Critical (Red Flag)
  > - 6-9 = Medium Critical (Yellow Flag)
  > - 1-5 = Basic Position (Green Flag)
- Show flag in the manager report for each position
  > - For our purposes, create 3 positions: HR Leader, Director, Receptionist

#### General

- Create a profile page and have first/last name entered there
- Only managers should be able to see the Members page
- Send one-time link with survey notification (i.e. send as one email)
  > - 3 day duration on the link
  > - Notification sent by a button on the Survey page
- Yohana will not be available next Thursday. She will make herself available on Tuesday next week instead

### Action Items

| **Member**           | **Tasks**                                                  |
| -------------------- | ---------------------------------------------------------- |
| Alexander Nguyen     | Address feedback on add members, send survey notifications |
| Irene Sun            | Export report to PDF                                       |
| Jaskirat Singh Saggu | Delete organization (frontend + backend)                   |
| Leah Sheptycki       | Create profile page                                        |
| Othman Sebti         | Finish one time survey link, reset password                |

## November 17, 2023, 6:00 pm

via Google Meet

### Agenda

- Discuss how report content (e.g. next steps) will be determined
- Further discuss organization GAP and position balance

### Attendees

\*Note that only backend team members (Alexander, Jaskirat, Othman) were expected to attend this meeting

- Alexander Nguyen
- Jaskirat Singh Saggu
- Othman Sebti
- Yohana Soto (Client)

### Minutes

#### Report Content

- Yohana will communicate with us potential next steps we can recommend to managers
- We can skip "we encourage you to apply for \_\_\_" (recommended steps) for now

#### Position Balance

- Definition: Number of resources needed for an employee to succeed in a position.
- Formula: Position Balance = Resposibilities/Resources
- If the lack of balance is in Span of Control/Span of Accountability:
  > - Focus on structure and control system (note to manager)
- If the lack of balance is in Span of Support/Span of Influence:
  > - Focus on interactive networks and shared responsibilities

#### Organization GAP

- Add organization GAP to only employee/manager reports for simplicity (only managers can see organization GAP for employees)
- Soft Levels: Span of Support/Span of Influence
- Hard Levels: Span of Control/Span of Accountability
- If gap is 0-1 (between elements of either soft or hard levels): Perfectly Balanced
- If gap >1 (between elements of either soft or hard levels): Unbalanced
- Span of Control refers to resources a company controls (e.g. humans, natural resources, etc.)
- Span of Influence refers to the information a company possesses

### Action Items

| **Member**           | **Tasks**                                                              |
| -------------------- | ---------------------------------------------------------------------- |
| Alexander Nguyen     | Connect reports to backend                                             |
| Irene Sun            | Finish UI tests                                                        |
| Jaskirat Singh Saggu | Update story map, help other members finish outstanding tasks          |
| Leah Sheptycki       | Connect surveys to backend                                             |
| Othman Sebti         | Reset password, Finish REST API endpoints for employee/manager reports |

## November 18, 2023, 1:20 pm

via Discord

### Agenda

- Discuss outstanding tasks for Sprint 4 that still need to be completed
- Assign tasks for Sprint 5

### Attendees

- Alexander Nguyen
- Irene Sun
- Jaskirat Singh Saggu
- Othman Sebti

### Minutes

- Alex will create a PR for the organization reports before the sprint deadline tonight
- We assigned tasks for Sprint 5. We tried to distribute the work as evenly as possible
- Some tasks from Sprint 4 need to be carried over to Sprint 5. Complete these tasks early in the sprint to ensure they will be completed for the MVP release

### Action Items

| **Member**           | **Tasks**             |
| -------------------- | --------------------- |
| Alexander Nguyen     | Finish Sprint 4 tasks |
| Irene Sun            | Finish Sprint 4 tasks |
| Jaskirat Singh Saggu | Finish Sprint 4 tasks |
| Leah Sheptycki       | Finish Sprint 4 tasks |
| Othman Sebti         | Finish Sprint 4 tasks |
