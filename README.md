# EcoBin Application

A smart waste management system with real-time bin monitoring and worker management.

## Features

- Dashboard with real-time statistics
- Bin location tracking with status indicators
- Analytics for waste collection patterns
- Worker management and task assignment

## Setup and Running the Server

### Prerequisites

- Python 3.6 or higher
- pip (Python package installer)

### Installation

1. Clone this repository or download the files
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

### Running the Server

To start the server, run:

```bash
python server.py
```

The server will start on http://localhost:5000

### Accessing the Application

- Dashboard: http://localhost:5000/dashboard
- Bin Locations: http://localhost:5000/bin-locations
- Analytics: http://localhost:5000/analytics

## API Endpoints

- GET /api/bins - Get all bins
- GET /api/workers - Get all workers
- GET /api/tasks - Get all tasks
- GET /api/activities - Get all activities
- GET /api/bins/{bin_id}/status - Get status of a specific bin
- PUT /api/bins/{bin_id}/status - Update status of a specific bin
- PUT /api/tasks/{task_id}/assign - Assign a task to a worker
- POST /api/simulate/update - Simulate bin status updates

## Technologies Used

- Frontend: HTML, CSS, JavaScript, Tailwind CSS
- Backend: Python, Flask
- Maps: Leaflet.js
- Icons: Font Awesome 