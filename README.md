# BrightRoots - Parenting Consultation Platform

A comprehensive web application for parenting consultation, education, and support for parents with children aged 0-5 years. Features bilingual support (English/Sinhala), expert consultations, Q&A forums, educational resources, and child development tracking.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [Frontend Routes](#frontend-routes)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [CSV Data Resources](#csv-data-resources)
- [Authentication](#authentication)

---

## ✨ Features

### For Parents
- **Ask Questions**: Submit parenting questions and receive expert answers
- **Edit/Delete Questions**: Manage your own unanswered questions
- **View Answers**: Track answered questions with consultant information
- **Dashboard**: Personal dashboard with question statistics and history

### For Consultants
- **Answer Questions**: Review and answer pending parent questions
- **Edit Answers**: Update and improve your previous answers
- **Dashboard**: View pending questions, answered history, and performance stats
- **Approval System**: Account requires admin approval before activation

### For Administrators
- **User Management**: Manage parents, consultants, and their account status
- **Question Management**: Oversee all questions and answers across the platform
- **Consultant Approval**: Approve or reject consultant registrations
- **Analytics Dashboard**: Track platform statistics and user engagement

### General Features
- **Bilingual FAQ System**: 225+ Q&A entries in English and Sinhala from 8 CSV files
- **Educational Articles**: Curated articles on child development, behavior, health
- **Expert Consultants**: Browse and connect with qualified child development specialists
- **Forum Discussions**: Community discussions categorized by age groups
- **Growth Tracker**: Monitor child development milestones
- **Interactive Learning**: Educational content for children (shapes, colors, numbers)
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **JWT Authentication**: Secure token-based authentication system
- **Role-Based Access Control**: Different permissions for parents, consultants, admins

---

## 🛠 Technology Stack

### Frontend
- **React 19.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 8.0** - Build tool and dev server
- **React Router DOM 6.22.0** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 11.0.5** - Animation library
- **Axios 1.13.6** - HTTP client
- **i18next 23.10.0** - Internationalization framework
- **Lucide React 0.462.0** - Icon library

### Backend
- **Python 3.13.5** - Server-side language
- **Flask 3.0.0** - Web framework
- **Flask-SQLAlchemy 3.1.1** - ORM for database operations
- **Flask-CORS 4.0.0** - Cross-origin resource sharing
- **PyJWT 2.10.0** - JSON Web Token implementation
- **Werkzeug 3.0.0** - Password hashing utilities
- **Pandas 2.1.4** - CSV data processing

### Database
- **SQLite** - Relational database (parenting_consultation.db)
- **SQLAlchemy** - Python SQL toolkit and ORM

---

## 📁 Project Structure

```
BrightRoots/
├── backend/                          # Flask backend application
│   ├── app.py                        # Main Flask application with all API routes
│   ├── models.py                     # SQLAlchemy database models
│   ├── requirements.txt              # Python dependencies
│   └── instance/
│       └── parenting_consultation.db # SQLite database
│
├── src/                              # React frontend application
│   ├── App.tsx                       # Main React component with routing
│   ├── main.tsx                      # Application entry point
│   ├── index.css                     # Global styles
│   │
│   ├── components/                   # Reusable React components
│   │   ├── Navbar.tsx               # Navigation bar with auth buttons
│   │   ├── Footer.tsx               # Site footer
│   │   └── ScrollToTop.tsx          # Scroll restoration component
│   │
│   ├── pages/                        # Page components (routes)
│   │   ├── HomePage.tsx             # Landing page
│   │   ├── LoginPage.tsx            # User login
│   │   ├── SignupPage.tsx           # User registration
│   │   ├── ParentDashboard.tsx      # Parent interface
│   │   ├── ConsultantDashboard.tsx  # Consultant interface
│   │   ├── AdminDashboard.tsx       # Admin control panel
│   │   ├── FAQPage.tsx              # FAQ browser with search
│   │   ├── ArticlesPage.tsx         # Educational articles
│   │   ├── ConsultantPage.tsx       # Consultant directory
│   │   ├── ForumPage.tsx            # Community discussions
│   │   ├── TrackerPage.tsx          # Development milestone tracker
│   │   └── LearningPage.tsx         # Interactive learning for children
│   │
│   ├── services/                     # API service layers
│   │   ├── api.ts                   # General API functions
│   │   └── auth.ts                  # Authentication API with JWT
│   │
│   └── i18n/                        # Internationalization
│       ├── config.ts                # i18next configuration
│       └── locales/                 # Translation files
│
├── SampleQuestion/                   # CSV data files (225+ FAQs)
│   ├── General - Parenting Q&A Ages 0-5.csv
│   ├── Health, Hygiene, Habits - Parenting Q&A.csv
│   ├── Discipline & School Readiness - Parenting Q&A.csv
│   ├── Social & Cognitive Development - next.csv
│   ├── Nutrition - Parenting Q&A Ages 0-5.csv
│   ├── Sleep - Parenting Q&A Ages 0-5.csv
│   ├── Language Development - Parenting Q&A Ages 0-5.csv
│   └── Behavior Management - Parenting Q&A Ages 0-5.csv
│
├── public/                          # Static assets
├── dist/                            # Production build output
├── node_modules/                    # Frontend dependencies
├── package.json                     # Frontend dependencies manifest
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── .env                             # Environment variables
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.13+
- **pip** package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the Flask server:**
   ```bash
   python app.py
   ```

   Backend will run at: `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will run at: `http://localhost:3000`

### Default Admin Account

After first run, a default admin account is automatically created:
- **Email:** admin@parentcare.com
- **Password:** admin123

**⚠️ IMPORTANT:** Change the default admin password in production!

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user (parent or consultant).

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone": "+94712345678",
  "role": "parent",
  "specialization": "Child Psychologist",
  "experience_years": 10,
  "bio": "Professional background..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### POST `/api/auth/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### GET `/api/auth/me`
Get current authenticated user information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "parent",
    "status": "active"
  }
}
```

### Question Endpoints

#### POST `/api/questions`
Submit a new question (Parents only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Sleep routine for 2-year-old",
  "question_text": "What's the best bedtime routine?",
  "category": "Sleep",
  "priority": "normal"
}
```

#### GET `/api/questions/my-questions`
Get all questions by current parent.

**Headers:** `Authorization: Bearer <token>`

#### GET `/api/questions/pending`
Get all pending questions (Consultants/Admins only).

**Headers:** `Authorization: Bearer <token>`

#### GET `/api/questions/all?status=all`
Get all questions with optional status filter (Consultants/Admins only).

**Query Parameters:**
- `status`: all | pending | answered

#### PUT `/api/questions/:id`
Edit own question (Parents only, unanswered questions only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated title",
  "question_text": "Updated question text",
  "category": "Health",
  "priority": "high"
}
```

#### DELETE `/api/questions/:id`
Delete own question (Parents only).

**Headers:** `Authorization: Bearer <token>`

#### POST `/api/questions/:id/answer`
Answer a question (Consultants only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "answer_text": "Detailed answer to the question..."
}
```

#### PUT `/api/questions/:id/answer`
Edit own answer (Consultants only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "answer_text": "Updated answer text..."
}
```

### Admin Endpoints

#### GET `/api/admin/users?role=all`
Get all users with optional role filter.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `role`: all | parent | consultant | admin

#### PUT `/api/admin/users/:id/status`
Update user account status (approve/reject consultants, deactivate users).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "active"
}
```

**Status values:** active | pending | suspended | rejected

#### DELETE `/api/admin/users/:id`
Delete a user account (cannot delete admins).

**Headers:** `Authorization: Bearer <token>`

#### DELETE `/api/admin/questions/:id`
Delete any question.

**Headers:** `Authorization: Bearer <token>`

#### GET `/api/admin/stats`
Get platform statistics.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "stats": {
    "total_parents": 150,
    "total_consultants": 12,
    "active_consultants": 8,
    "pending_consultants": 4,
    "total_questions": 320,
    "pending_questions": 45,
    "answered_questions": 275
  }
}
```

### FAQ Endpoints

#### GET `/api/faqs`
Get all FAQ entries (225+ bilingual Q&A).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "When should I start solid foods?",
      "questionSi": "ඝන ආහාර ආරම්භ කළ යුත්තේ කවදාද?",
      "answer": "Around 6 months of age...",
      "answerSi": "මාස 6 පමණ වයසේදී...",
      "category": "Nutrition"
    }
  ],
  "count": 225
}
```

#### GET `/api/faqs/search?q=sleep&lang=en`
Search FAQs by keyword.

**Query Parameters:**
- `q`: search query
- `lang`: en | si (default: en)

#### GET `/api/faqs/category/:category`
Get FAQs by category.

**Categories:** General | Health | Discipline | Development | Nutrition | Sleep | Language | Behavior

### Other Endpoints

#### GET `/api/forum/discussions?category=all`
Get forum discussions.

#### GET `/api/articles?category=all`
Get educational articles.

#### GET `/api/consultants?available=false`
Get consultant directory.

#### POST `/api/consultations/book`
Book a consultation session.

#### GET `/api/tracker/milestones`
Get child development milestones.

#### GET `/api/health`
Health check endpoint.

---

## 🗄 Database Schema

### User Model
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    specialization VARCHAR(200),
    experience_years INTEGER,
    bio TEXT
);
```

**Roles:** parent | consultant | admin

**Status Values:**
- `active` - Account is active and can login
- `pending` - Consultant awaiting admin approval
- `suspended` - Account temporarily disabled
- `rejected` - Consultant application rejected

### Question Model
```sql
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL,
    consultant_id INTEGER,
    title VARCHAR(200) NOT NULL,
    question_text TEXT NOT NULL,
    category VARCHAR(50),
    answer_text TEXT,
    answered_at DATETIME,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'normal',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES users(id),
    FOREIGN KEY (consultant_id) REFERENCES users(id)
);
```

**Status Values:** pending | answered | closed

**Priority Values:** low | normal | high | urgent

### Booking Model
```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    consultant_id INTEGER,
    parent_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    child_age VARCHAR(50) NOT NULL,
    concern TEXT NOT NULL,
    preferred_date VARCHAR(50) NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 👥 User Roles & Permissions

### Parent Role
**Status:** Active immediately upon registration

**Permissions:**
- ✅ Submit new questions
- ✅ View own questions and answers
- ✅ Edit own unanswered questions
- ✅ Delete own unanswered questions
- ❌ Cannot edit/delete answered questions (data integrity)
- ✅ Access Parent Dashboard
- ✅ Browse FAQ, articles, consultants, forum

### Consultant Role
**Status:** Pending by default, requires admin approval

**Permissions:**
- ✅ View all pending questions
- ✅ Answer pending questions
- ✅ Edit own answers
- ✅ View answered question history
- ✅ Access Consultant Dashboard
- ❌ Cannot edit/delete questions submitted by parents
- ✅ Browse FAQ, articles, forum

### Admin Role
**Status:** Active

**Permissions:**
- ✅ Full access to Admin Dashboard
- ✅ Manage all users (view, approve, suspend, delete)
- ✅ Approve or reject consultant applications
- ✅ View all questions and answers
- ✅ Delete any question or user
- ✅ View platform statistics and analytics
- ✅ Access all features

---

## 🌐 Frontend Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | HomePage | Public | Landing page with hero section |
| `/login` | LoginPage | Public | User login form |
| `/signup` | SignupPage | Public | User registration form |
| `/parent-dashboard` | ParentDashboard | Parent | Ask questions, view answers |
| `/consultant-dashboard` | ConsultantDashboard | Consultant | Answer questions, edit answers |
| `/admin` | AdminDashboard | Admin | User & question management |
| `/faq` | FAQPage | Public | Browse 225+ bilingual FAQs |
| `/articles` | ArticlesPage | Public | Educational articles |
| `/consultant` | ConsultantPage | Public | Consultant directory |
| `/forum` | ForumPage | Public | Community discussions |
| `/tracker` | TrackerPage | Public | Growth milestone tracker |
| `/learning` | LearningPage | Public | Interactive learning for kids |

---

## ⚙️ Configuration

### Frontend Configuration

**vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
```

**Environment Variables (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

### Backend Configuration

**app.py**
```python
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///parenting_consultation.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

**⚠️ Security Notes:**
- Change SECRET_KEY in production
- Use environment variables for sensitive configuration
- Enable HTTPS in production
- Implement rate limiting for API endpoints

---

## 📖 Usage Guide

### For Parents

1. **Register**: Sign up with role "Parent" - account is active immediately
2. **Login**: Access your parent dashboard
3. **Ask Questions**: Submit questions about parenting challenges
4. **Edit Questions**: Modify or delete unanswered questions
5. **View Answers**: Check answered questions from consultants
6. **Browse Resources**: Explore FAQs, articles, and community forum

### For Consultants

1. **Register**: Sign up with role "Consultant" - provide credentials
2. **Wait for Approval**: Admin must approve your account (status: pending)
3. **Login**: Once approved, access consultant dashboard
4. **Answer Questions**: Browse pending questions and provide expert answers
5. **Edit Answers**: Update your previous answers to improve clarity
6. **Track Performance**: View stats on answered questions

### For Administrators

1. **Login**: Use default admin account or create new admin
2. **Approve Consultants**: Review and approve consultant applications
3. **Manage Users**: View, suspend, or delete user accounts
4. **Moderate Content**: Review and delete inappropriate questions
5. **Monitor Platform**: Check analytics and user engagement stats

---

## 📊 CSV Data Resources

The platform loads 225+ FAQs from 8 CSV files in bilingual format (English/Sinhala):

### CSV Files Structure

Each CSV file contains columns:
- `Question (English)` - Question in English
- `Question (Sinhala)` - Question in Sinhala
- `Answer (English)` - Answer in English
- `Answer (Sinhala)` - Answer in Sinhala

### Categories

1. **General** (50+ Q&A)
   - File: `General - Parenting Q&A Ages 0-5.csv`
   - Topics: General parenting advice for ages 0-5

2. **Health** (35+ Q&A)
   - File: `Health, Hygiene, Habits - Parenting Q&A.csv`
   - Topics: Health concerns, hygiene practices, healthy habits

3. **Discipline** (25+ Q&A)
   - File: `Discipline & School Readiness - Parenting Q&A.csv`
   - Topics: Behavior discipline, school preparation

4. **Development** (30+ Q&A)
   - File: `Social & Cognitive Development - next.csv`
   - Topics: Social skills, cognitive milestones

5. **Nutrition** (20+ Q&A)
   - File: `Nutrition - Parenting Q&A Ages 0-5.csv`
   - Topics: Feeding, nutrition, food introduction

6. **Sleep** (20+ Q&A)
   - File: `Sleep - Parenting Q&A Ages 0-5.csv`
   - Topics: Sleep routines, sleep problems, bedtime

7. **Language** (20+ Q&A)
   - File: `Language Development - Parenting Q&A Ages 0-5.csv`
   - Topics: Speech development, communication skills

8. **Behavior** (25+ Q&A)
   - File: `Behavior Management - Parenting Q&A Ages 0-5.csv`
   - Topics: Behavior management, tantrums, emotional regulation

---

## 🔐 Authentication

### JWT Token Authentication

The platform uses JSON Web Tokens (JWT) for secure authentication.

**Token Flow:**
1. User logs in with email/password
2. Server validates credentials
3. Server generates JWT token with 7-day expiration
4. Client stores token in localStorage
5. Client includes token in Authorization header for protected requests
6. Server validates token on each protected request

**Token Structure:**
```javascript
{
  user_id: 123,
  role: 'parent',
  exp: 1709999999  // Expiration timestamp
}
```

**Frontend Token Management:**

```typescript
// Store token on login
localStorage.setItem('token', token);

// Add to requests via Axios interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Clear on logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

**Backend Token Validation:**

```python
@token_required
def protected_route(current_user):
    # current_user is automatically injected
    return jsonify({'user': current_user.to_dict()})
```

**Security Features:**
- Password hashing using Werkzeug (PBKDF2)
- Token expiration (7 days)
- Role-based access control (@role_required decorator)
- CORS protection
- SQL injection prevention (SQLAlchemy ORM)

---

## 🧪 Development

### Frontend Development

**Run development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Lint code:**
```bash
npm run lint
```

### Backend Development

**Run Flask development server:**
```bash
cd backend
python app.py
```

**Database Operations:**

The database is automatically created on first run. To reset:
```bash
# Stop the server
# Delete the database file
rm instance/parenting_consultation.db
# Restart the server (creates fresh database)
python app.py
```

### Code Style

**Frontend:**
- TypeScript strict mode enabled
- ESLint configured for React
- Prettier for code formatting
- Tailwind CSS for styling

**Backend:**
- PEP 8 Python style guide
- Type hints recommended
- Docstrings for complex functions

---

## 🚧 Known Limitations

1. **SQLite Database**: Not recommended for high-traffic production. Consider PostgreSQL or MySQL for scaling.
2. **File-based CSV Loading**: FAQs loaded into memory on startup. Consider moving to database for large datasets.
3. **No Email Verification**: User registration doesn't require email confirmation.
4. **Static Consultant Data**: Consultant profiles are hardcoded. Should be pulled from User model.
5. **No File Uploads**: No support for uploading images or attachments in questions/answers.
6. **Basic Search**: FAQ search is simple string matching. Consider full-text search for better results.

---

## 🔮 Future Enhancements

- [ ] Real-time chat between parents and consultants
- [ ] Email notifications for question answers
- [ ] Payment integration for consultation bookings
- [ ] Video consultation support
- [ ] Mobile app (React Native)
- [ ] Advanced search with filters
- [ ] User profile management
- [ ] Rating system for consultants
- [ ] Bookmarking favorite articles/FAQs
- [ ] Export reports to PDF
- [ ] Multi-language support (Tamil, English, Sinhala)

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👨‍💻 Developer

Developed as part of a parenting consultation platform project.

For questions or support, contact the development team.

---

## 🙏 Acknowledgments

- FAQ data curated from parenting experts
- Consultant profiles for demonstration purposes
- Unsplash for placeholder images
- React and Flask communities for excellent documentation

---

**Version:** 1.0.0  
**Last Updated:** March 12, 2026
