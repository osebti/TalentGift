# Project Requirements

## Executive Summary

Our project is geared towards the need to promote a supportive and collaborative atmosphere within organizations. In particular, we want to create a web application that facilitates stronger connections between managers, employees, and the organization as a whole by offering a wide range of user-friendly surveys that generate insightful statistical reports. These surveys serve as a guideline for both managers and employees in identifying their own strengths and weaknesses as well as enable managers to have a better understanding of their own crews. This will eventually lead to an improved workplace dynamic and productivity across the whole organization.

## Project Glossary

- **Company GAP** - A weighted percentage score representing how well a company is utilizing their employees.

- **Competency** - An employee or manager's strengths and weaknesses (measured through surveys).

- **Employee** - A subordinate who can take surveys and view reports to gauge how well they fit with an organization. Each employee has a unique ID.

- **Goal** - A desired result that employees and managers are looking to achieve (measured through surveys).

- **Manager** - A business leader who can take surveys and view both company reports and employee reports to determine how the company can improve. Each manager has a unique ID.

- **Organization** - A group of employees and managers who work for the same company.

- **Report** - A summary generated based on an employee or manager's survey responses. A report includes company GAP, a venn diagram (goals/values/competencies), and insights about an employee/manager's work style.

- **Survey** - A set of questions and answers used to retrieve data from users. This data is used to generate reports after a survey is submitted.

- **Value** - Motivation behind an employee or manager's actions (measured through surveys).

## User Stories

### US 1.01.01 - User - Sign Up with Email

> **As** a User, **I want** to register an account with the app, **so that** I can access the app's functionalities.
>
> **Acceptance Tests**
>
> 1. The user should provide a valid and unique email
> 2. The user's account is successfully created (there is a record in the database)

### US 1.01.02 - User - Verified Account

> **As** a User, **I want** to have a verification code sent to my email as a confirmation while signing up, **so that** I can ensure the email address is correct.
>
> **Acceptance Tests**
>
> 1. The user receives the verification code and a confirmation link via email

### US 1.02.01 - User - Sign In with Email

> **As** a User, **I want** to sign in with my email and password **so that** I can access the app's functionalities.
>
> **Acceptance Tests**
>
> 1. The user can successfully log in using their valid email and correct password
> 2. Access is denied if the user enters an invalid email or password (non-existent or incorrect)

### US 1.02.02 - User - Sign In with Google

> **As** a User, **I want** to sign in with my Google account, **so that** I can access the app's functionalities quickly and conveniently.
>
> **Acceptance Tests**
>
> 1. The user can access the sign-in page before signing in
> 2. The user can successfully sign in using their valid Google account

### US 1.03.01 - User - Reset Password

> **As** a User, **I want** to be able to reset my password, **so that** I can regain access to my account if I forget my password.
>
> **Acceptance Tests**
>
> 1. The User can access the password reset functionality without signing in
> 2. A verification is sent to the valid email address
> 3. User is prompted to set a new password if they complete the verification process

### US 1.04.01 - User - View Website Information

> **As** a User, **I want** to be able to access information about the website, including the details about the statistical methods used and the website's goals, **so that** I can understand how I can use the app.
>
> **Acceptance Tests**
>
> 1. The information on the website is correctly displayed
> 2. The user can access this page without signing in

### US 1.05.01 - User - Create Organization

> **As** a User, **I want** to create an organization on the website, **so that** I can add my company to the website.
>
> **Acceptance Tests**
>
> 1. The user can access the functionality to add an organization
> 2. The User is prompted to enter the organization name and a valid organization contact email
> 3. The organization and default entities associated with it (i.e. base survey) are successfully created

### US 1.06.01 - User - View Profile

> **As** a User, **I want** to be able to see my profile, **so that** I can see and verify my personal information, including name, email and password.
>
> **Acceptance Tests**
>
> 1. User is able to access a page displaying their profile information after signing in
> 2. The information is displayed correctly

### US 1.06.02 - User - Modify Information

> **As** a User, **I want** to modify my name and my password, **so that** I fix any mistakes if they happen.
>
> **Acceptance Tests**
>
> 1. The user can modify the name and password
> 2. The name can only be changed once every three months
> 3. Notify managers when one employee's name is changed
> 4. Changing the password redirects to the resetting password page

### US 2.01.01 - Manager - Add Members

> **As** a Manager, **I want** to add other users to be a member of my organization, **so that** I can connect to and understand the employees I manage through the app.
>
> **Acceptance Tests**
>
> 1. The manager can search for the employee by entering the employee's email
> 2. The member is added to the organization as an Employee

### US 2.01.02 - Manager - Delete Members

> **As** a Manager, **I want** to delete a member from my organization, **so that** I can prevent them from accessing the organizations'surveys.
>
> **Acceptance Tests**
>
> 1. The manager can see a list of employees within the organization
> 2. The manager can successfully delete an employee from the organization
> 3. The deleted member can no longer access the organization's data and surveys

### US 2.02.01 - Manager - Add Survey Question

> **As** a Manager, **I want** to add a question to the survey of my organization, **so that** I can get more survey data.
>
> **Acceptance Tests**
>
> 1. The manager can add a question to the survey
> 2. The manager can assign different weights for different answers to a question
> 3. Users can see the new question in the survey after the manager submits the changes

### US 2.02.02 - Manager - Edit Survey Question

> **As** a Manager, **I want** to edit a survey question of the organization I created, **so that** I can tailor the survey to my needs.
>
> **Acceptance Tests**
>
> 1. The manager can select an existing question to edit
> 2. The manager can edit the question, its answers, and its weight
> 3. Users can see the updated question in the survey after the manager submits the changes

### US 2.02.03 - Manager - Delete Survey Question

> **As** a Manager, **I want** to delete a survey question of the organization I created, **so that** I can get rid of unnecessary survey data.
>
> **Acceptance Tests**
>
> 1. The manager can select an existing question to delete
> 2. The question no longer exists after the manager submits the changes
> 3. No data for the question is recorded

### US 2.02.04 - Manager - Set Survey Visibility

> **As** a Manager, **I want** to set the survey visibility **so that** I can control which survey reports are available for my employees.
>
> **Acceptance Tests**
>
> 1. The survey visibility only works with the managers
> 2. The manager can successfully set the survey visibility
> 3. The employees can see the survey report only if the manager sets it visible

### US 2.02.05 - Manager - Set Survey Notification

> **As** a Manager, **I want** to set the survey notification **so that** I can notify my employees when the survey is updated.
>
> **Acceptance Tests**
>
> 1. The manager can successfully set the survey notification
> 2. Each employee receives a notification email of the survey along with the shared link

### US 2.03.01 - Manager - View Organization Report

> **As** a Manager, **I want** to view the organization's report **so that** I get to know the statistics of the company.
>
> **Acceptance Tests**
>
> 1. The manager can access the organization's overview page
> 2. The manager can see different types of graphs that are drawn from the data collected from all the past surveys

### US 2.04.01 - Manager - View Employee Report

> **As** a Manager, **I want** to be able to see the profiles of my employees, **so that** I can understand how they are doing in the organization.
>
> **Acceptance Tests**
>
> 1. The manager can access the profile pages of their employees
> 2. The manager can see a list of their employees
> 3. Selecting an employee brings up the corresponding employee's profile
> 4. The manager can see different types of graphs that are drawn from the data collected from all the past surveys taken by one employee

### US 2.05.01 - Manager - View Manager Report

> **As** a Manager, **I want** to see a personalized report of a survey, **so that** I can receive alerts about my employees while monitoring my own performance at the organization
>
> **Acceptance Tests**
>
> 1. The manager can see a personalized report generated from their survey responses
> 2. The manager can see alerts about their employees

### US 2.06.01 - Manager - Delete an Organization

> **As** a Manager, **I want** to be able to delete an organization I've created, **so that** I can get rid of the organization from my account.
>
> **Acceptance Tests**
>
> 1. The organization is deleted from the site if the Manager confirms (delete from database)

### US 3.01.01 - Employee - One-time Link Survey

> **As** an Employee, **I want** to be able to take a survey via a one-time survey link, **so that** I can get or give feedback on performance.
>
> **Acceptance Tests**
>
> 1. The employee can click the link to access a corresponding survey
> 2. The employee cannot redo the survey once the answer is submitted

### US 3.02.01 - Employee - View Individual Survey Report

> **As** a User, **I want** to see reports that I am eligible to view, **so that** I can be informed of company progress.
>
> **Acceptance Tests**
>
> 1. The user is able to access only the set of reports that they are eligible to see
> 2. The user can select a report to see more information corresponding to the report

### US 4.01.01 - User - Take a Survey

> **As** a User, **I want** to be able to take a survey, **so that** my answers can get feedback on my performance.
>
> **Acceptance Tests**
>
> 1. The user/manager can access a survey that allows them to get or give feedback
> 2. The user/manager can successfully take and submit an answer to the survey
> 3. Statistics generated from the survey data are updated

### US 4.02.01 - User - Export Report to PDF

> **As** a User, **I want** to be able to export my report to a PDF file, **so that** I can easily share my report with others
>
> **Acceptance Tests**
>
> 1. The user can export a report to a PDF file after they take a survey
> 2. The user cannot export a report if they haven't taken a survey yet
> 3. The exported PDF file is downloaded to the user's device

## MoSCoW

### Must Have

- US 1.01.01 - (User - Sign Up with Email)
- US 1.02.01 - (User - Sign In with Email)
- US 1.05.01 - (User - Create Organization)
- US 2.01.01 - (Manager - Add Members)
- US 2.01.02 - (Manager - Delete Members)
- US 2.02.05 - (Manager - Set Survey Visibility)
- US 2.03.01 - (Manager - View Organization Report)
- US 2.04.01 - (Manager - View Employee Report)
- US 2.05.01 - (Manager - View Manager Report)
- US 2.06.01 - (Manager - Delete an Organization)
- US 3.02.01 - (Employee - View Individual Survey Report)
- US 4.01.01 - (User - Take a Survey)

### Should Have

- US 1.04.01 - (User - View Website Information)
- US 1.06.01 - (User - View Profile)
- US 3.01.01 - (Employee - One-time Link Survey)
- US 4.02.01 - (User - Export Report to PDF)

### Could Have

- US 1.03.01 - (User - Reset Password)
- US 1.06.02 - (User - Modify Information)
- US 2.02.06 - (Manager - Set Survey Notification)

### Would Like But Won't Get

- US 1.01.02 - (User - Verified Account)
- US 1.02.02 - (User - Sign In with Google)
- US 2.02.01 - (Manager - Add Survey Question)
- US 2.02.02 - (Manager - Edit Survey Question)
- US 2.02.03 - (Manager - Delete Survey Question)

## Similar Products

### [Lattice](https://lattice.com/)

- A Human Resource software that promotes growth and performance
- Analytical Report - The platform contains a lot of analytical tools and graphs to help managers gain insights into the performance of their employees
- Performance Feedback - The platform facilitates regular evaluations, providing an iterative process of skill development

### [Clarity Wave](https://www.claritywave.com/)

- A human resource software that helps connect people within an organization
- Survey Utilization - The platform employs surveys to gather feedback from employees, enabling managers to gain a deeper understanding of their teams

## Open-source Projects

### [Frappe HR](https://github.com/frappe/hrms)

- A human resource website designed to administrate employees
- Attendance Administration - The platform simplifies attendance tracking and makes it more convenient for employees to log their contributions

## Technical Resources

### Backend: Node.js + Express + PostgreSQL

- [Node.js Documentation](https://nodejs.org/en/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express Documentation](https://expressjs.com/en/guide/routing.html)

### Frontend: React + Tailwind + Typescript + Daisy UI

- [Typescript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/learn)
- [Tailwind Documentation](https://tailwindcss.com/docs/installation)
- [Daisy UI Documentation](https://daisyui.com/)

### Deployment: Cybera

- [Cybera Rapid Cloud Access Guide](https://wiki.cybera.ca/display/RAC/Rapid+Access+Cloud+Guide%3A+Part+1#RapidAccessCloudGuide:Part1-Overview)
