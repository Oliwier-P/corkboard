# Corkboard - Real-Time Project Management Web Application

Corkboard is a collaborative project management web application designed to organize releases and tasks within workspaces. It provides real time updates, customizable workflows, and collaborative documentation to help teams manage their work efficiently.

[Live Demo](https://corkboard.up.railway.app)

## Core Features:

### Release & Task Management:

Workspace-based organization of releases and tasks
- Task assignment to workspace members
- Configurable task statuses (To Do, In Progress, Done, etc.)
- Task priorities and customizable tags
- Release planning and management with an ordered list of releases, including current and upcoming releases

### Workspace Management:

- Workspace-specific settings and preferences
- Optional task codenames with configurable prefixes and sequential identifiers (e.g., XY-01)
- Configurable workspace behavior and task identification
- User-specific preferences for customizing the application interface

### Collaborative Documentation:

- Dedicated document editor for creating and managing workspace documentation
- Rich-text editing with a bubble toolbar for formatting
- Support for text alignment, lists, and other formatting options
- Image insertion directly into documents
- Real-time collaborative editing with live user presence indicators
- Visible collaborator cursors and text positions to track where other users are editing

### Real-Time Experience:

- Live synchronization of application data using WebSockets
- Real-time updates across tasks, releases, and workspace activity
- Live collaboration features for shared documents
- Dynamic interface updates without requiring manual page refreshes

## Backend Architecture:

- Rails-based backend with structured application logic
- PostgreSQL database for persistent data storage
- Real-time communication using Rails Action Cable and WebSocket channels
- Architecture designed to support extensible project management features


## Tech Stack:
Frontend: `React`

Backend: `Ruby on Rails`

Database: `PostgreSQL`

Real-Time Communication: `Rails Action Cable` + `WebSockets`
