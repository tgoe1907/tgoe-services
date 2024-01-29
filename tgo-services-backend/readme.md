# How to Start Backend Services

- Go to tgo-services-backend folder
- ```source env/bin/activate``` to activate virtual environment in commandline
- ```pip install -r requirements.txt```
- ```python manage.py migrate``` to create Database
- ```python manage.py runserver```

# How to use Docker
- Go into tgo-serivces-backend folder
- ```docker build .```
- ```docker run -d -p 8080:8080 imagehash```