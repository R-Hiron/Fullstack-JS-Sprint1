# Fullstack-JS-Sprint1

Semester Three Full StackJavaScript Sprint OneAuthored by Peter Rawsthorne, peter.rawsthorne@keyin.comProject Description:Many full-stack applications also require a Command Line Interface (CLI) to aid in configuration and system administration. This Full Stack JavaScript project is to build a simple CLIfor a web application that needs to confirm new user accounts. The project will use node.js to create the web applications directory (or folder) structure and to add the configuration and text files for the new application. The CLI will provide commands to view and alter the configuration of the application and to create tokens to be used to confirm a new user.Learning Outcomes:1.Proven ability to build a Command Line Interface (CLI) using Node.2.Proven ability to organize node.js code into modules and to deploy a small full stackproject.3.Proven ability to confirm and create a directory (folder) structure and organize files into the structure.4.Proven ability to read and write json and text files using the node fs common core module(s).5.Proven ability to alter and update attributes of a json configuration file.6.Proven ability to generate a consistently unique token based upon the Cyclic Redundancy Check (CRC) to hash a value which is used to confirm every new user.7.Proven ability to store new user authentications to a json file.8.Proven ability to call the same token generation module from both the command line and a simplehtml pagehosted by a node http serveror an express server.9.Proven ability to log all the application actions to an events log file saved to disk. 10.Proven ability to manage the sprint project as a team evidenced by creating a github organization with a repository and github project boards.
Marking: In this program core evaluation is marked with one of three possible marks: Incomplete(Fail), Pass, and Pass Outstanding.For Sprints and QAPs, where incomplete marks are more important for our own information as well as for the information of the student, we wanted to increase the resolution of our grading system. Therefore, each QAPand team-based Sprint have outcomes that are marked on a scale of 1-5. The details of this marking system are summarized in the table below.See project rubric found in the respective MS-Teams Assignments description.GradeMeaning1Incomplete. Studentor Teamshows severe lack of understanding of the material –solution is heavily incomplete, non-functional, or completely off base of what the assignment was asking for.2Partially Complete.Studentor Teamshow some understanding of the material. Solution maybe non-functional or partially functional, but the approach is correct, albeit with some major bugs or missing features.3Mostly Complete.Studentor Teamdemonstrates understanding of the major ideas of the assignment. Solution is mostly working, albeit with a few small bugs or significant edge cases which were not considered. Shows a good understanding of the correct approach, and is either nearly a feature-complete solution, or is a feature-complete solution with some bugs.4Complete (Equivalent to: Pass.) Studentor Teamshows complete understanding of assigned work and implemented all necessary features. Any bugs that are present are insignificant (for example aesthetic bugs when testing the functionality of code) and do not impact the core functionality in a significant way. All necessary objectives for the assignment are completed, and the studentor team has delivered something roughly equivalent to the canonical solution in terms of features and approach.5Complete with Distinction (Equivalent to: Pass Outstanding) The Student or Teamdemonstrates a clear mastery of the subject matter tested by the Sprint or QAP. The solution goes above and beyond in some way, makes improvements on the canonical solution, or otherwise demonstratesthe student’s mastery of the subject matter in some way. A solution in this category would consider all reasonable edge cases and implement more than the necessary functionality required by the assignment.Reminder: See project rubric found in the respective MS-Teams Assignments description.
Project features as user stories:User Roles:•End usersare hands-on customers who work directly with various software products and tools to deliver on their personal or business goals.•Helpdesk employeesare the go-to people for providing technical assistance and support related to computer systems, hardware,and software. They are responsible for answering queries and addressing system and end user issues in a timely and professional manner.•System administratorsare responsible for managing, troubleshooting, licensing, and updating hardware and software assets. User Stories:•As a system administrator I would like a command line interface(CLI)to initialize the application to build the required directory structureand add the default configuration and help files. •As a system administrator I would like the CLI to provide a status for the initialization and configuration.•As a system administrator I would like the CLI to provide a view of the current configuration file(s).•As a system administrator I would like the CLI to provide the ability to update the configuration file with new values.•As a system administrator I would like the CLI to provide the ability to reset the configuration file back to its original state.•As a helpdesk employeeI would like the CLI to provide the ability to generate a user token based on an end users username. This token would be the same as presented to the user via the end user self service web form.•As a helpdesk employee I would like the CLI to provide the ability to add/update the user records email and/or phone number.•As a helpdesk employee I would like the CLI to provide the ability to search for a user record queried by username, email, or phone number.•As a new end user I would like a web form that allows me to enter my username and after pressing submit receive a token I could use to confirm my new membership. o(Note: in the real world, thistoken would be sent to the new user via email or SMS.(At this timeKeyin does nothave eitheran outbound email or SMSserver available for this development testing. We will stay with using the web form).
Project Features as user helpProject Deliverables:A github repositorythat contains the following;1.The repository is part of a Github organization with all sprint teammembers as contributors.2.One or more Github projects used to organize assignment user stories (issues) as cards.3.Evidenceof branching and merging from a main or master code branch (trunk).4.All of the node.js files used to implement the project.5.All other text or json files implemented by the project.6.All dependent .json files that reference the project dependencies (ie. package.json)7.Project documentation to ease the evaluation / marking of the sprint solution.Note: do not include the node_modules folder in the repository.A recorded video demonstrating your working solution.•Share a short (15min or less) “demo video” of your final, deployed, solution working! Have the full team join a Teams call, walk through your solution and the source code with team members describing the solution and record it! This deliverable is very important!!!I needit for marking!
