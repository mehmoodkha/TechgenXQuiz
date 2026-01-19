# DevOps Mastery Hub - Linux Setup Guide

This guide will help you get the application running on a fresh Linux installation.

## 1. System Preparation
First, update your package manager and install Python 3 and the Virtual Environment tool.
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv -y
```

## 2. Project Setup
Clone your code to the desired directory, then navigate into it:
```bash
# Assuming you are in the project root
python3 -m venv venv
source venv/bin/activate
```

## 3. Install Dependencies
```bash
pip install -r requirements.txt
```

## 4. Initialize Database
Run migrations to create the tables and use the provided seed script to populate the initial content.
```bash
python3 manage.py migrate
python3 seed_db.py
```

## 5. Environment Configuration
You must provide your Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
```bash
export API_KEY='your_actual_api_key_here'
```

## 6. Launch
Start the development server:
```bash
python3 manage.py runserver 0.0.0.0:8000
```
Visit `http://your-server-ip:8000` in your browser.

---

### Project Structure
- `core/`: Django app containing models and views.
- `templates/`: HTML templates using Tailwind CSS and Alpine.js.
- `seed_db.py`: One-time script to populate the database questions.
