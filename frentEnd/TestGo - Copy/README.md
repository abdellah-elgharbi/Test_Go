# TestGo - Web Application for Online Tests

**TestGo** is a modern, scalable web application designed to allow users to create, manage, and take online tests/quiz. The application follows a **microservices architecture** with **Vite** and **React** for a fast and responsive frontend. It enables teachers to create and manage various types of tests (multiple-choice, coding challenges, hybrid) and provides real-time feedback to students.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Allows students and teachers to sign up, log in, and manage their profiles.
- **Role-based Access**: Different access levels for students, teachers, and administrators.
- **Test Creation**: Teachers can create tests in multiple formats such as multiple-choice questions (MCQ), coding challenges, or hybrid tests.
- **Test-taking Interface**: Students can take tests with a built-in timer, randomization of questions, and automatic scoring.
- **Real-time Results**: Students receive immediate feedback after submitting their tests.
- **Analytics**: Teachers can view performance dashboards and manage student results.
- **Responsive Design**: Fully responsive design compatible with desktops, tablets, and mobile devices.

## Technologies Used

- **Frontend**:
  - **React.js**: For building interactive UI components and dynamic user interfaces.
  - **Vite**: Next-generation build tool and development server for faster compilation and better developer experience.
  - **SWC**: Used for faster JavaScript and TypeScript transpiling during development.
  
- **Backend (Microservices)**:
  - **Java**: Used for backend services in a microservices architecture.
  - **Spring Boot**: Framework for creating RESTful microservices.
  - **Spring Security**: For handling authentication and authorization.
  - **Docker**: To containerize backend microservices.
  - **Spring Cloud**: For managing and deploying microservices in a cloud environment.

- **Database**:
  - **MongoDB**: NoSQL database for storing user data, test questions, and results.
  - **Mongoose**: MongoDB Object Modeling for JavaScript (if integrating with Node.js microservices).

- **DevOps**:
  - **CI/CD**: Using GitHub Actions/Jenkins for continuous integration and deployment pipelines.
  - **Nginx**: Reverse proxy and load balancing for microservices.
  - **Kubernetes** (optional): For orchestrating and scaling microservices across environments.

- **Testing**:
  - **JUnit**: Unit testing for Java-based backend services.
  - **Selenium**: Frontend UI testing and browser interaction automation.
  - **Postman**: For API testing and documentation.

## Installation

To get started with **TestGo**, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/testgo.git
cd testgo
