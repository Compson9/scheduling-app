Xcelsz Scheduling Platform
A job-matching platform with a scheduling feature that allows freelancers and clients to schedule meetings efficiently. This project includes a fully functional frontend and backend, with features for scheduling, updating, canceling meetings, and checking user availability.

Features
Scheduling Meetings
Users can schedule meetings by selecting a date, time, duration, and participants.
Meetings are displayed in a user-friendly card layout with options to edit or delete.
Manage Meetings
Users can update or cancel existing meetings.
Participants are notified of changes (simulated via console logs).
Availability Check
Users can view available time slots for scheduling.
Unavailable slots are highlighted and cannot be selected.
Responsive Design
The platform is fully responsive and works seamlessly on both desktop and mobile.
Tech Stack
Frontend
Framework: Next.js (React)
Styling: Tailwind CSS, ShadCN components
State Management: React hooks (useState, useEffect)
Backend
Framework: Next.js API Routes
Storage: In-memory data simulation for development
Data Handling: RESTful APIs for CRUD operations
Setup Instructions
Prerequisites
Node.js (v16+)
npm or yarn
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-repo/xcelsz-scheduling-platform.git
cd xcelsz-scheduling-platform
2. Install Dependencies
bash
Copy code
npm install
3. Run the Development Server
bash
Copy code
npm run dev
The app will be available at http://localhost:3000.

Project Structure
plaintext
Copy code
.
├── app/
│   ├── api/
│   │   ├── meetings/
│   │   │   └── route.ts        # API routes for meeting CRUD operations
│   │   └── users/
│   │       ├── [userId]/
│   │       │   └── available-slots/
│   │       │       └── route.ts # API route for user availability
│   └── page.tsx                # Main page of the application
├── components/
│   ├── MeetingForm.tsx         # Form for scheduling/editing meetings
│   ├── MeetingList.tsx         # List of scheduled meetings
│   └── UI/                     # Shared UI components
├── lib/
│   ├── data.ts                 # In-memory meeting data
│   ├── availability.ts         # In-memory user availability data
│   └── db.ts                   # Database connection file (placeholder for future integration)
├── styles/
│   └── globals.css             # Global CSS styling
├── README.md                   # Project documentation
└── package.json                # Project dependencies and scripts
API Endpoints
Meetings
POST /api/meetings - Create a new meeting.

Request Body:
json
Copy code
{
  "title": "Team Meeting",
  "date": "2025-01-06",
  "time": "10:00",
  "duration": 60,
  "participants": ["client@example.com", "freelancer@example.com"]
}
Response:
json
Copy code
{ "message": "Meeting created successfully", "id": 1 }
PUT /api/meetings - Update an existing meeting.

Request Body:
json
Copy code
{
  "id": 1,
  "title": "Updated Meeting",
  "date": "2025-01-07",
  "time": "12:00",
  "duration": 90,
  "participants": ["newclient@example.com"]
}
DELETE /api/meetings?id=1 - Delete a meeting by ID.

GET /api/meetings - Fetch all scheduled meetings.

User Availability
GET /api/users/:userId/available-slots - Fetch unavailable slots for a user.

POST /api/users/:userId/available-slots - Add unavailable slots for a user.

Request Body:
json
Copy code
{
  "date": "2025-01-08",
  "timeSlots": ["10:00", "14:00"]
}
DELETE /api/users/:userId/available-slots?date=2025-01-06&timeSlot=10:00 - Remove an unavailable slot.

Testing
Frontend
Unit and integration tests using Jest and React Testing Library.
Coverage includes scheduling, editing, and deleting meetings.
API Testing
All API endpoints were tested with Postman.
Edge cases like overlapping slots and missing fields were validated.
Future Enhancements
Database Integration:
Replace in-memory storage with a MySQL database.
Real-Time Notifications:
Add WebSocket support to notify users of meeting updates in real-time.
User Authentication:
Implement secure user login and role-based access control.
Contributing
Fork the repository.
Create a feature branch:
bash
Copy code
git checkout -b feature-name
Commit changes:
bash
Copy code
git commit -m "Added new feature"
Push to the branch:
bash
Copy code
git push origin feature-name
Open a Pull Request.