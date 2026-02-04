FROM python:3.12-slim

WORKDIR /app


RUN apt-get update && apt-get install -y curl && apt-get clean


COPY services/task-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt


COPY services/task-service /app


HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8002/health || exit 1

EXPOSE 8002

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8002"]
