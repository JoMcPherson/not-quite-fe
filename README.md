# Not Quite Olympians

**Project Description:**
Not Quite Olympians is a web application developed by Tyler Byrd, Shaan Malhotra, Juan Jose Pinol, and Joanna McPherson. The application is designed to host and attend events tailored for beginners interested in exploring Olympic sports. Users can create, manage, and participate in events, providing a platform for enthusiasts to engage in and try out various sports.

## Project Architecture

### Frontend

- **Framework:** React (TypeScript)
- **Deployment:** Hosted on AWS S3 with AWS CodeBuild for continuous integration and deployment.
- **Build Tool:** Vite for building the React application.
- **Styling:** Tailwind CSS for styling.
- **API Calls:** Utilizes Axios for making HTTP requests to backend services.
- **Authentication:** AWS Cognito for managing user authentication and authorization.

### Backend

- **Framework:** Java Spring Boot
- **Deployment:** Hosted on AWS Elastic Beanstalk.
- **API Endpoints:** Provides various RESTful endpoints for CRUD operations and other business logic.
- **Authentication:** Secured with AWS Cognito, using OAuth2 and JWT for managing authentication and authorization.
- **Spring Security:** Configured to permit access to specific paths and integrate with AWS Cognito for user authentication.
- **Database:** PostgreSQL for data storage and management, hosted on AWS RDS.

## API Summary

### Endpoints

#### **`/events`**

- **GET**: Retrieve a list of events.
- **POST**: Create a new event.

#### **`/events/{id}`**

- **GET**: Retrieve details for a specific event.
- **PUT**: Update details of a specific event.
- **DELETE**: Delete a specific event.

#### **`/event_attendees`**

- **GET**: Retrieve a list of attendees for events.
- **POST**: Add a new attendee to an event.

#### **`/event_attendees/{id}`**

- **GET**: Retrieve details of a specific event attendee.
- **DELETE**: Remove an attendee from an event.

## API Integration

- **Frontend to Backend Communication:** The React application communicates with the backend via HTTP requests using Axios. Requests are made to endpoints hosted on Elastic Beanstalk.
- **Authentication Flow:** The frontend uses AWS Cognito for user sign-in and access management. Authenticated requests are sent with JWT tokens to secure backend endpoints.

## Testing

- **Frontend:** Tested using Vitest for React components and integration tests.
- **Backend:** Tested using standard Mockito Java testing framework.

## Additional Details

- **Event Management:** The backend includes services for managing events and attendees, with corresponding API endpoints for creating, updating, and retrieving event details.
- **Deployment Workflow:** The frontend is built and deployed to S3 using AWS CodeBuild. The backend is managed and deployed via AWS Elastic Beanstalk, ensuring scalability and reliability.

## Project Resources

- **Database Diagram:**
  ![Database Diagram](images/dbdiagram.png)
- **Wireframe:**
  ![Wireframe](images/wireframe.png)

- **Page Screenshots:**
  ![Screenshot 1](images/pagescreenshots/screenshot1.png)
  ![Screenshot 2](images/pagescreenshots/screenshot2.png)
  ![Screenshot 3](images/pagescreenshots/screenshot3.png)
