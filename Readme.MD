# Task Manager - Setup Guide

## 10 Steps to Run the Project

### Step 1: Install Docker Desktop
Download and install Docker Desktop from https://www.docker.com/products/docker-desktop
Start Docker Desktop application and wait for it to be running

### Step 2: Clone the Repository
```bash
git clone https://github.com/mahi0601/TaskAManagerGreenChoice.git
```

### Step 3: Navigate to Project Directory
```bash
cd TaskAManagerGreenChoice
```

### Step 4: Verify Docker is Running
```bash
docker --version
docker-compose --version
```
Both commands should show version numbers

### Step 5: Build Docker Images
```bash
docker-compose build
```
This will build both backend and frontend Docker images (takes 2-3 minutes)

### Step 6: Start the Application
```bash
docker-compose up
```
This starts both backend (port 5000) and frontend (port 3000) services

### Step 7: Wait for Services to Start
Wait until you see:
- Backend: "Running on http://0.0.0.0:5000"
- Frontend: "Compiled successfully!"

### Step 8: Open the Application
Open your web browser and go to:
```
http://localhost:3000
```

### Step 9: Use the Application
- Add tasks using the form at the top
- Change task status using the dropdown menu
- Delete tasks using the Delete button

### Step 10: Stop the Application
Press `Ctrl+C` in the terminal, or run:
```bash
docker-compose down
```

## Alternative: Run Without Docker

### Backend (Terminal 1)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend (Terminal 2)
```bash
cd frontend/taskmanager
npm install
npm start
```

## Project Structure
```
TaskAManagerGreenChoice/
├── backend/
│   ├── app.py
│   ├── tasks.json
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   └── taskmanager/
│       ├── src/
│       ├── package.json
│       └── Dockerfile
└── docker-compose.yml
```

## API Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/<id>` - Update task
- `DELETE /api/tasks/<id>` - Delete task

## Troubleshooting

**Port already in use:**
```bash
# Stop existing services
docker-compose down
# Or change ports in docker-compose.yml
```

**Docker build fails:**
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

**Frontend not loading:**
- Check backend is running: `curl http://localhost:5000/api/tasks`
- Check browser console (F12) for errors
- Verify Docker containers: `docker-compose ps`
