# DevOps Mastery Hub - Local Deployment Guide

Follow these steps to get the full-stack AI-powered application running on your local machine.

## 1. Prerequisites
- **Python 3.10+**
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

## 2. Installation

### Create Virtual Environment
```bash
python -m venv venv
```

### Activate Environment
- **Windows:** `venv\Scripts\activate`
- **Mac/Linux:** `source venv/bin/activate`

### Install Dependencies
```bash
pip install -r requirements.txt
```

## 3. Configuration
Set your Gemini API Key as an environment variable:
- **Windows (CMD):** `set API_KEY=your_api_key`
- **Mac/Linux:** `export API_KEY='your_api_key'`

## 4. Database Setup
Initialize the SQLite database and seed the DevOps questions:
```bash
python manage.py migrate
python seed_db.py
```

## 5. Run the Application
```bash
python manage.py runserver
```
Visit `http://127.0.0.1:8000` in your browser.

---
**Note:** This application uses Django for the backend, Alpine.js for the frontend, and Tailwind CSS for styling. No Node.js is required.