#  QuizUp
QuizUp is an innovative web-based platform designed to provide a seamless experience for both students and teachers. The platform offers a dynamic environment where students can engage with educational content through quizzes, courses, and rapid-fire rounds (RFR), while teachers have full control over course creation, quiz management, and student progress monitoring.
This project is split into two main parts:
- **Frontend**: Built with React, Vite, and modern web development tools.
- **Backend**: Built with Node.js, Express, and MongoDB to handle server-side operations and data storage.
## Features
### Student Features
1. **Browse and Participate in Quizzes**:
   - Students can explore a variety of quizzes across different topics and difficulty levels.
   - Each quiz consists of multiple-choice questions with immediate feedback on performance.
   - Quizzes can be taken at any time, and progress is tracked automatically.
2. **View and Enroll in Courses**:
   - Students can browse through available courses based on their interests and educational needs.
   - Once enrolled, students can access course materials, assignments, and resources.
   - Courses can be categorized by subject, difficulty, or learning objectives.
3. **Track Course Progress and Quiz Results**:
   - Students can see their progress within each course, including completed lessons, quizzes, and milestones.
   - Quiz results are saved and presented in a dashboard format, helping students track their learning progress over time.
   - Students receive detailed insights into their performance, including correct and incorrect answers.
4. **Rapid Fire Round (RFR)**:
   - A unique feature that allows students to engage in a time-pressured quiz environment where they must answer as many questions as possible within a short period.
   - The RFR is designed to test quick thinking and recall under pressure, making it both fun and challenging.
   - Students compete against the clock and can challenge themselves to improve their speed and accuracy over time.
5. **User Profile and Settings**:
   - Students have personal accounts that store their quiz scores, course progress, and RFR history.
   - Profile settings allow users to update their details, change passwords, and adjust notification preferences.
### Teacher Features
1. **Create and Manage Courses**:
   - Teachers can create and manage their own courses, including adding lessons, assignments, and other educational content.
   - Courses are structured with clear learning paths, and teachers can customize the course difficulty and topics.
   - Teachers can edit or remove existing courses at any time.
2. **Create and Manage Quizzes**:
   - Teachers have the ability to create quizzes related to specific courses or standalone quizzes.
   - The quiz creation interface allows teachers to define questions, set answer options, and configure scoring rules.
   - Teachers can assign quizzes to students and monitor their progress.
3. **Manage Student Progress and RFRs**:
   - Teachers can view detailed reports on student performance, including quiz results, course completion status, and overall progress.
   - Teachers can track student participation in the Rapid Fire Round (RFR) and analyze their speed and accuracy.
   - Teachers can also give feedback on student performance, helping them improve their understanding.
4. **Student Communication**:
   - Teachers can interact with students directly through the platform, providing feedback, guidance, and support.
   - Students can ask questions, and teachers can respond either via general course discussions or direct messages.
5. **Manage RFR Feedback**:
   - Teachers can view student performance in the Rapid Fire Round (RFR) and provide insights or tips for improvement.
   - Teachers can track how well students are performing in time-sensitive scenarios and tailor their teaching methods accordingly.
## Technologies Used
### Frontend:
- **React**: A JavaScript library for building user interfaces, used for creating the interactive components of the platform.
- **Vite**: A modern build tool that offers fast and efficient bundling of the frontend assets.
- **JSX**: JavaScript XML syntax used to write UI components in a declarative manner.
- **React Context API**: Used for global state management across different parts of the application.
- **CSS**: Styling and layout of the web pages, making the platform visually appealing and user-friendly.
### Backend:
- **Node.js**: A JavaScript runtime used to build the server-side logic of the platform.
- **Express**: A minimal web framework for building RESTful APIs.
- **MongoDB**: NoSQL database used for storing user data, course content, quizzes, and student performance.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB, used for defining schemas and interacting with the database.
- **JWT (JSON Web Tokens)**: Used for secure authentication and user session management.
## Installation 
+ Clone the repository:
   ``` 
   git clone https://github.com/aluriDevAnanth/QuizUp.git 
   ```
+ Navigate to backend folder
  ```
  npm install
  npm run dev
  ```
+ Navigate to quizUpFrontEnd folder
  ```
  npm install
  npm run dev
  ``` 
