# Let's Meet

## Description
Have you ever struggled with finding the best time to meet with your friends? Been flaked or have flaked on friends at the last minute? Let's Meet is a web application that is designed to help users easily coordinate and plan out events. 
Let's Meet aims to allow users to create, accept, and schedule public events. The beauty behind our design is that a user can define roles and a budget for each event so that each event is organized without added stress to the meeting planner. 

### Minimal Viable Product

#### The main features of this application are:
* Creating an account with the following information: name, email, location, and age
* Searching for friends and inviting new users
* Creating an event draft with event title, description, and attendees
* Assigning roles and keeping track of event tasks, expenses, supplies, etc. after event creation
* Managing costs and budgets in events
* Accepting and denying events
* Viewing created events and upcoming events

#### Themes
* Account creation and management
* Event creation and management
* Budgeting
* Event organization


## Team Members & Github Links
* [Bing Chen](https://github.com/bingychen)
* [Rahul Das](https://github.com/rahulbdas1)
* [Joanne Han](https://github.com/jkh394)
* [Crystal Lee](https://github.com/leecrystal)
* [Forzana Rime](https://github.com/forzana)


## History
We wanted to develop an app that would not only make our lives much more convenient, but also increase our exposure to new libraries and technologies, which ultimately led us to decide on an application that relies on communication among users. We were inspired by apps such as Doodle and when2meet, but we felt like they could be improved upon. So, we decided to implement new features of our own that would make our app stand out and be more attractive to potential users. 

# Useful Links
* [Original Proposal](https://github.com/agile-dev-assignments/user-experience-design-bajia-matrix)
* [Contributions](https://github.com/agile-dev-assignments/project-setup-bajia-matrix/blob/master/CONTRIBUTING.md)

## Local Setup
* Clone repository onto local machine using Visual Studio OR
* Clone through command line: `git clone https://github.com/agile-dev-assignments/project-setup-bajia-matrix.git`

## Building and Testing the Project 
### System requirements:
* This application requires Docker, please install at https://www.docker.com/get-started.
* This application also uses Make scripts, install for your particular Operating System.

#### Secret .env file:

*Contact one of our team members for the .env file, then* 
```
cd back-end/letsmeet/
mkdir config
cd config
copy the contents of the .env file into a file called dev.env
```

#### Build and start the container:
From the root directory (project-setup-bajia-matrix)
```
make build-dev
make run-dev
```

#### Address:
Visit the application at http://localhost:3000


This repository will be used for team projects.

Several sets of instructions are included in this repository. They should each be treated as separate assignments with their own due dates and sets of requirements.

1. Delete the contents of this file and replace with the contents of a proper README.md, as described in the [project setup instructions](./instructions-1a-project-setup.md)

1. See the [Sprint Planning instructions](instructions-1b-sprint-planning.md) for the requirements of Sprint Planning for each Sprint.

1. See the [Front-End Development instructions](./instructions-2-front-end.md) for the requirements of the initial Front-End Development.

1. See the [Back-End Development instructions](./instructions-3-back-end.md) for the requirements of the initial Back-End Development.

1. See the [Database Integration instructions](./instructions-4-database.md) for the requirements of integrating a database into the back-end.

1. See the [Deployment instructions](./instructions-5-deployment.md) for the requirements of deploying an app.
