FROM python:3

WORKDIR /usr/src/app

ENV PYTHONUNBUFFERED=1

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN pwd
RUN ls -l

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8080"]
EXPOSE 8080