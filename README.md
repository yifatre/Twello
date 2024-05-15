# Twello

A full-stack web application that replicates the core functionalities of "Trello" app, developed by Yifat Regensberg, Moshe Benlolo and Roi Doron.

- **You can access the deployed application at:** https://twello-bk3n.onrender.com/
- **Backend Repo**: https://github.com/PescadoMuerto1/twello-backend

<img src="https://res.cloudinary.com/di5cspvle/image/upload/v1715775399/Screenshot_2024-05-15_141637_ych7ls.png">
<img src="https://res.cloudinary.com/di5cspvle/image/upload/v1715775707/Screenshot_2024-05-15_152056_ddhaua.png">
<img src="https://res.cloudinary.com/di5cspvle/image/upload/v1715775399/Screenshot_2024-05-15_141535_wwuclw.png">
<img src="https://res.cloudinary.com/di5cspvle/image/upload/v1715775399/Screenshot_2024-05-15_141740_qjm4am.png">

Built with :

![Tech](https://skillicons.dev/icons?i=js,html,css,sass,react,redux,mongodb,nodejs,express,vite,git,&perline=11)


## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies](#technologies)
5. [Contributors](#contributors)
6. [User Guide](#user-guide)
   


## Features

- Create and customize project boards with an intuitive drag-and-drop interface.
- Add Lists and tasks, use a variety of components such as labels checklists and date picker to manage your tasks.
- Filter your tasks by different parameters.
- Display your project as a table.
- Real-time collaboration with team members using web sockets.
- User login/sign up system with auth checks.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/PescadoMuerto1/twello-backend.git
```

2. Install dependencies:

```sh
cd twello-backend
npm install
```

3. Start the application:

```sh
cd twello-backend
npm run prod
```
- for macOS:
```sh
cd twello-backend
npm run prod:mac
```

## Usage

1. Visit `http://localhost:3030` in your web browser.
2. Click on "Try it now for free" to start.
3. Create a new project or choose an exiting one to get started.
4. Customize the project adding groups and tasks to the board, use different functionalities to manage your projects.
5. Collaborate with team members in real-time.

## Technologies

- React
- Redux
- MongoDB
- SASS
- Node.js
- Express.js
- WebSockets
- D&D

## Contributors
- [Yifat Regensberg](https://www.linkedin.com/in/yifat-regensberg)
- [Moshe Benlolo](https://www.linkedin.com/in/moshe-benlolo-298802300/)
- [Roi Doron](https://www.linkedin.com/in/roi-doron-8b4b782ab/)


## User Guide
- [Getting Started](#getting-started)
- [Creating a Board](#creating-a-board)
- [Creating Lists](#creating-lists)
- [Adding Cards](#adding-cards)
- [Card Details](#card-details)
- [Using Labels](#using-labels)
- [Adding Members](#adding-members)
- [Setting Due Dates](#setting-due-dates)
- [Checklists and Attachments](#checklists-and-attachments)
- [Views](#views)
- [Real-Time Updates](#real-time-updates)
- [Tips](#tips)
- [Mobile App](#mobile-app)

#### Getting Started

1. **Recommended: Use Without an Account**: To use without an account click on "Try it now for free"
2. **Sign Up or Log In**: Visit [Twello](https://twello-bk3n.onrender.com/) and sign up for a free account or log in if you already have one.

#### Creating a Board

1. **Add a New Board**: Click the "Create new board" button at the top left of the screen.
2. **Board Details**: Enter a name for your board and select a background color or image.
3. **Create Board**: Click "Create Board" to finalize.

#### Creating Lists

1. **Add a List**: Inside your board, click "Add a list".
2. **List Name**: Enter a name for your list (e.g., To Do, In Progress, Done).
3. **Add List**: Click "Add List" or press Enter to create it.

#### Adding Cards

1. **Add a Card**: Click "Add a card" at the bottom of any list.
2. **Card Title**: Enter a title for your card.
3. **Add Card**: Click "Add Card" or press Enter to create it.

#### Card Details

1. **Open Card**: Click on a card to view its details.
2. **Description**: Add a detailed description of the task.
3. **Activity**: View the activity log for updates on changes to the card.

#### Using Labels

1. **Labels**: Click the "Labels" button in a card to add color-coded labels.
2. **Custom Labels**: Create custom labels to categorize your tasks (e.g., High Priority, Bug, Feature).

#### Adding Members

1. **Members**: Click the "Members" button in a card to assign team members to the task.
2. **Invite Members**: Invite members to your board by clicking the "Invite" button at the top right of the board.

#### Setting Due Dates

1. **Due Date**: Click the "Due Date" button in a card to set a deadline.
2. **Calendar**: Select the date and time from the calendar popup.

#### Checklists and Attachments

1. **Checklists**: Click "Checklist" in a card to add a checklist. Enter checklist items and check them off as you complete them.
2. **Attachments**: Click "Attachment" to upload files.

#### Views

1. **Board View**: Default view, shows the workflow of your project.
2. **Table View**:  Click on the "Table" button at the top of your board to view your project in a table form.

#### Mobile View

1. **Responsive Design**: Twello is responsive and works well on mobile browsers. Simply open Twello in your mobile browser to access a mobile-optimized version of your boards.
2. **Interacting with Cards**: Tap on cards to view details, and make changes just like on the desktop version.
3. **Drag and Drop**: You can still drag and drop cards and lists using touch gestures on your mobile device.

#### Real-Time Updates

1. **Instant Changes**: Any changes made to boards, lists, or cards are updated in real-time across all devices. This ensures everyone on your team sees the most current information.
2. **Collaborative Editing**: Multiple team members can work on the same board simultaneously without conflicts. Updates made by others appear instantly.
4. **Activity Log**: The activity log in each card shows a real-time history of all actions taken on that card, providing a transparent view of progress and changes.

#### Tips

- **Drag and Drop**: Easily move cards and lists by dragging and dropping them.
- **Search and Filter**: Use the search bar to quickly find cards or apply filters to view specific cards.
- **Move Between Boards**: Navigate between your different boards through the side bar on the left side of your board.
- **Quick Edit**: To quickly edit a card click on the pencil in the top right corner of the card.
- **Collapse/Extend List**: To hide/show some of your lists click on the "⇾⇽"/"⇽⇾" button at the top of the list. 
- **Extend/Collapse Labels**: To show/hide the names of your labels click on any of the labels.

