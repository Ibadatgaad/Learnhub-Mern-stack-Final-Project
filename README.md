# LearnHub — MERN Stack Learning Management System

**Repository:** [https://github.com/Ibadatgaad/Learnhub-Mern-stack-Final-Project](https://github.com/Ibadatgaad/Learnhub-Mern-stack-Final-Project)

A full-stack Learning Management System built with MongoDB, Express, React, and Node.js. Students can browse and enroll in courses; instructors can create courses and lessons; admins manage users and view platform analytics.

## Features

**Question 1 — Core App**
- Browse courses, view course details
- User registration and login
- Full course CRUD (Create, Read, Update, Delete)

**Question 2 — Production-Ready**
- JWT authentication with bcrypt password hashing
- Role-based access control: Student, Instructor, Admin
- Protected backend routes (middleware) and frontend routes (role-based redirects)
- Enrollment system with progress tracking
- Instructor lesson management (add/view/delete lessons per course)
- Admin dashboard: user management + platform analytics

## Tech Stack

- **Frontend:** React, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Auth:** JSON Web Tokens (JWT), bcryptjs

## Project Structure

```
learnhub/
  backend/
    config/
      db.js
    models/
      User.js
      Course.js
      Enrollment.js
      Lesson.js
    controllers/
      authController.js
      courseController.js
      enrollmentController.js
      adminController.js
      lessonController.js
    routes/
      authRoutes.js
      courseRoutes.js
      enrollmentRoutes.js
      adminRoutes.js
      lessonRoutes.js
    middleware/
      authMiddleware.js
    server.js
    .env
  frontend/
    src/
      components/
        Navbar.js
        ProtectedRoute.js
      pages/
        Home.js
        CourseListing.js
        CourseDetail.js
        Login.js
        Register.js
        CreateCourse.js
        StudentDashboard.js
        InstructorDashboard.js
        AdminDashboard.js
      services/
        api.js
      App.js
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB running locally (or a MongoDB Atlas connection string)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/learnhub
JWT_SECRET=your_secret_key_here
```

Run the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`.

### Production Build

```bash
cd frontend
npm run build
npm install -g serve
serve -s build
```

## API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/register` | Public |
| POST | `/login` | Public |

### Courses
| Method | Endpoint | Access |
|---|---|---|
| GET | `/courses` | Public |
| POST | `/courses` | Instructor, Admin |
| PUT | `/courses/:id` | Instructor, Admin |
| DELETE | `/courses/:id` | Instructor, Admin |

### Enrollment
| Method | Endpoint | Access |
|---|---|---|
| POST | `/enroll` | Student |
| GET | `/my-courses` | Student |
| GET | `/enrollments/course/:courseId` | Instructor, Admin |

### Lessons
| Method | Endpoint | Access |
|---|---|---|
| POST | `/courses/:courseId/lessons` | Instructor (course owner), Admin |
| GET | `/courses/:courseId/lessons` | Public |
| DELETE | `/lessons/:id` | Instructor (course owner), Admin |

### Admin
| Method | Endpoint | Access |
|---|---|---|
| GET | `/admin/users` | Admin |
| DELETE | `/admin/users/:id` | Admin |
| GET | `/admin/analytics` | Admin |

## Data Models

**User:** name, email, password (hashed), role (student/instructor/admin), timestamps

**Course:** title, description, instructor (ref: User), category, price, timestamps

**Enrollment:** student (ref: User), course (ref: Course), progress (0–100), timestamps

**Lesson:** course (ref: Course), title, content, order, timestamps

## Roles

- **Student:** browse courses, enroll, view enrolled courses + progress on their dashboard
- **Instructor:** create/edit/delete their own courses, add/delete lessons on their own courses, view their dashboard
- **Admin:** full course management (any course), view all users, delete users, view platform analytics

## Author

Built as a final project for the MERN Stack Web Development course.
