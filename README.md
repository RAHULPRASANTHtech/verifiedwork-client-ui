---Overview---

VerifiedWork is a role-based freelance collaboration and productivity tracking platform designed to improve transparency between clients, freelancers, and administrators. The system addresses limitations in existing freelance platforms by combining estimated task-level effort with time-interval–based activity tracking, allowing clients to better understand project progress and working patterns.

The platform focuses on reducing financial friction, improving visibility into actual work effort, and enabling structured project management without relying on opaque bidding or commission-heavy models.

---Problem Statement---

> Most existing freelance platforms:

> Do not provide clear visibility into estimated vs actual working hours

> Offer limited transparency into day-to-day progress

> Introduce high financial overhead through bidding credits and platform commissions

> Lack administrative control for managing large freelancer groups

This creates trust gaps between clients and freelancers and makes project planning difficult.

---Solution---

VerifiedWork introduces:

> Role-based access control for Clients, Freelancers, and Admins

> Estimated work-hour tracking using task-based to-do lists

> Periodic activity verification through time-interval screenshots

> Administrative mediation to manage freelancer allocation and project oversight

> Productivity insights, such as average weekly production and project health indicators

---System Architecture---

The system consists of multiple components:

# Client Panel

View project progress and productivity data

Monitor estimated vs actual working hours

Access activity summaries and reports

# Freelancer Panel

Update task lists and estimated working hours

Track daily productivity

Submit work activity data

# Admin Panel

Manage clients and freelancers

Assign projects or create allocation polls

Monitor system-wide activity and requests

# Desktop Monitoring Agent (Electron.js)

Captures screenshots at 10-minute intervals

Sends activity data to the backend for analysis
(Implemented by another contributor; integration pending)

# Backend & Database

Centralized REST APIs

Role-based authentication

Stores user data, tasks, productivity metrics, and activity logs

Technologies Used

# Frontend: HTML, JavaScript

# Backend: RESTful APIs

# Database: Relational database (DBMS)

# Desktop Agent: Electron.js (separate module)

# Version Control: Git & GitHub

---My Role & Contributions---

Designed overall system flow and architecture

Implemented backend logic and database schema

Built Client and Admin panels with role-based access

Developed REST APIs for managing users, tasks, and productivity data

Worked on authentication and data retrieval mechanisms

Collaborated with another developer responsible for the Electron-based monitoring agent

Current Status

The project is functional but not fully complete.

---Completed:

Client panel

Admin panel

Backend APIs

Database integration for client and admin roles

Core system design and workflows

---Pending / In Progress:

Full integration of Electron.js monitoring agent

Freelancer panel enhancements

Role-based authentication refinements

UI/UX improvements

Advanced analytics and reporting features

---Limitations

Monitoring agent integration is incomplete due to time constraints

Screenshot-based tracking raises privacy and scalability considerations

System requires further testing for large-scale usage

---Future Improvements

Complete Electron.js integration

Improve freelancer task management

Add privacy-preserving activity analysis

Enhance scalability for large freelancer groups

Introduce configurable tracking intervals and analytics dashboards

---Learning Outcomes

This project helped me gain hands-on experience in:

Backend system design

Role-based access control

Database-driven applications

Real-world problem-solving

Working with partially complete systems and iterative improvement

# Repository Notes

This repository currently contains the client-side implementation.
Additional modules (backend services and desktop monitoring agent) are maintained separately or are under development.
