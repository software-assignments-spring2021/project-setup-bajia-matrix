# Contributing
## Values, Norms, Doneness
* We strongly believe in the slogan "No coder left behind" so we will aim to help fellow groupmates, now family, if they are hindered in any way.
* If we have a defiant group member that fails to complete their tasks twice in a row, scrum master will step in.
* We consider our task to be DONE when the task fulfills the acceptance criteria to the best of our combined ability. 
* We will read all team member messages and give some indication on the more important ones, either in the form of an emoji or a reply.
* Our team norms include:
  * Responding quickly to team messages
  * Getting things done on time
  * Communicating our problems
  * Zoom Meeting Link: https://nyu.zoom.us/j/4173645108?pwd=ZThZdTJvSWRmbkJJMnRyUEhacW1KZz09#success 
  * Daily Standup: Tues, Fri, Sun 4 pm eastern

## Git Workflow
* Branch per task 
* Merge with copy of master before creating pull request
* Communicate with team members to resolve merge conflicts

## Rules of Contributing
* Everyone must contribute equally
* Tasks will be divided equally
* Make sure contributions will be made before daily standup

## Conflict Resolutions
* When conflicts arise between groupmembers, there will be a voting system in place, and majority vote will determine the course of action.
* If resolution is not reached, we will consult the professor or tutor.

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
