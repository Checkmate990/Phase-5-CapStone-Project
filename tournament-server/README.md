### Tournament Flask App (Backend)

This is the backend for the Tournament Flask App. It is a Flask app that uses PostgreSQL to store data. It is a RESTful API that uses JSON to communicate with the frontend.

#### Installation

$ git clone
$ cd tournament-server

#### Setup and activate virtual environment

$ python3 -m venv .venv
$ source .venv/bin/activate

#### Install dependencies

$ pip install --upgrade pip
$ pip install -r requirements.txt

#### Run the app

$ python manage.py run

$ python manage.py recreate-db
$ python manage.py seed-db