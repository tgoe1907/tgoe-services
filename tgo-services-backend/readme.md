# How to Start Backend Services

- Go to tgo-services-backend folder
- ```source .venv/bin/activate``` to activate virtual environment in commandline
- ```pip install -r requirements.txt```
- ```python manage.py migrate``` to create Database
- ```python manage.py runserver```

# How to use Docker
## Note docker does not work at the moment because of a bug with drf_yasg the app does not start: Maybe some newer version could solve this confict
- Go into tgo-serivces-backend folder
- ```docker build .```
- ```docker run -d -p 8080:8080 imagehash```