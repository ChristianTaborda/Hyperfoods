
FROM python:latest
#ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app

COPY ./backend/requirements.txt .
COPY ./backend/rest .
COPY ./frontend/build ./front/build
RUN pip install -r requirements.txt
RUN useradd -s /bin/bash myuser
USER myuser

#If you wanna test with compose, enable the follow lines

EXPOSE 8000

ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "--insecure", "0.0.0.0:8000"]