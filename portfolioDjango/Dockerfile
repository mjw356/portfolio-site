FROM python:3.11

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY database/proddb.sqlite3 database/proddb.sqlite3
COPY portfolioApi/ portfolioApi/
COPY portfolioDjango/ portfolioDjango/
COPY manage.py secret_key.txt ./
COPY media/images/ media/images/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]