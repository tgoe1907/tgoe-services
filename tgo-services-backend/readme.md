# How to Start Backend Services
You need a python installation.
It is recommended to use a virtual environment for this project that depedencies don't collide with other projects.
We tested the project with python version 3.12.7.

- Go to tgo-services-backend folder
- ```pip install -r requirements.txt```
- ```python manage.py makemigrations```
- ```python manage.py migrate``` to create Database
- ```python manage.py runserver```

# How to use Docker
## Note docker does not work at the moment because of a bug with drf_yasg the app does not start: Maybe some newer version could solve this confict
- Go into tgo-serivces-backend folder
- ```docker build .```
- ```docker run -d -p 8080:8080 imagehash```