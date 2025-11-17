# Task Manager - Setup Guide

## Quick Start (For Interviewers)

```bash
# Clone the repository
git clone https://github.com/mahi0601/TaskAManagerGreenChoice.git
cd TaskAManagerGreenChoice

# Build and run with Docker
docker-compose up --build

# Open browser: http://localhost:3000
```

## Prerequisites
- Docker Desktop installed and running
- Git (for cloning)

## 10-Step Setup Instructions

### Step 1: Install Docker Desktop
Download and install Docker Desktop from https://www.docker.com/products/docker-desktop
Start Docker Desktop application

### Step 2: Clone Repository
```bash
git clone https://github.com/mahi0601/TaskAManagerGreenChoice.git
cd TaskAManagerGreenChoice
```

### Step 3: Verify Docker Installation
```bash
docker --version
docker-compose --version
```

### Step 4: Check Project Structure
```bash
ls -la
```
Should see: `backend/`, `frontend/`, `docker-compose.yml`

### Step 5: Build Docker Images
```bash
docker-compose build
```
This builds both backend and frontend Docker images.

### Step 6: Start All Services
```bash
docker-compose up
```
This starts both backend (port 5000) and frontend (port 3000) services.

### Step 7: Verify Services Are Running
```bash
# In a new terminal, check running containers
docker-compose ps

# Test backend API
curl http://localhost:5000/api/tasks
```
Should return: `{"tasks":[]}`

### Step 8: Access Frontend Application
Open your browser and navigate to:
```
http://localhost:3000
```

### Step 9: Use the Application
- Add new tasks using the form at the top
- Move tasks between columns (To Do, In Progress, Done) using dropdown
- Delete tasks using the Delete button

### Step 10: Stop Services
```bash
# Press Ctrl+C in the terminal running docker-compose up
# Or in a new terminal run:
docker-compose down
```

## Alternative: Run Without Docker

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup (new terminal)
```bash
cd frontend/taskmanager
npm install
npm start
```

## Additional Commands

### View Logs
```bash
docker-compose logs -f
```

### Rebuild After Code Changes
```bash
docker-compose up --build
```

### Run in Background
```bash
docker-compose up -d
```

### Stop and Remove Containers
```bash
docker-compose down
```

### Clean Up (Remove Images)
```bash
docker-compose down --rmi all
```

## Project Structure
```
TaskAManagerGreenChoice/
├── backend/
│   ├── app.py
│   ├── tasks.json
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   └── taskmanager/
│       ├── src/
│       ├── package.json
│       ├── Dockerfile
│       └── .dockerignore
├── docker-compose.yml
└── Readme.MD
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/<id>` - Update task
- `DELETE /api/tasks/<id>` - Delete task

## Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change ports in docker-compose.yml
```

### Docker Build Fails
```bash
# Clean and rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Frontend Not Connecting to Backend
- Verify backend is running: `curl http://localhost:5000/api/tasks`
- Check browser console for errors (F12)
- Verify REACT_APP_API_URL in docker-compose.yml

### Docker Not Starting
- Ensure Docker Desktop is running
- Check Docker Desktop settings for resource allocation
- Restart Docker Desktop if needed
