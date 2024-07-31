
# SkySync : Flight Status & Updates  

### Home Page

![Home Page](frontend/src/assets/homepage.png)

  

### PPT Link
[**SkySync PPT - Google Slides Presentation**](https://docs.google.com/presentation/d/1FXYXTvvcmCBKxCVHrZVLlikIwCbh0LiQ_8O8qBPUqkA/edit?usp=sharing)

### Youtube Video Link
[**SkySync - Walkthrough**](https://youtu.be/Sn0Qsa2pW_M)
---

  

### Overview

SkySync is a comprehensive flight status and notifications system designed to provide real-time updates on flight statuses, including delays, cancellations, and gate changes. Built using a microservices architecture, the application leverages external services for flight and booking information, ensuring passengers receive accurate and timely notifications.

  

The architecture consists of multiple microservices, including an API Gateway, Dashboard Service, Notification Service, Flight Service, and Booking Service, all communicating via Kafka for efficient data handling. This design allows for seamless scalability and decoupling of services, enabling the system to handle high loads while maintaining performance.

  

---

  

### Tech Stack

-  **Frontend:** React.js, Material-UI

-  **Backend:** Node.js, Express

-  **Database:** PostgreSQL, Prisma ORM

-  **Message Broker:** Kafka

-  **Notifications:** Twilio (SMS), Nodemailer (Email)

  

---

  

## Steps to Run the Application

### Setup Instructions
---
#### Prerequisites
1. **Docker**: Ensure Docker is installed and running on your machine. You can download Docker from [here](https://www.docker.com/get-started). 
2. **PostgreSQL**: Install and run PostgreSQL. You can use [Postgres.app](https://postgresapp.com/) for macOS or follow the instructions from the [PostgreSQL website](https://www.postgresql.org/download/). 
3. **ZooKeeper and Kafka**: Run ZooKeeper and Kafka using Docker.
  
#### Setting Up PostgreSQL
1. **Install PostgreSQL**: - For macOS, you can use [Postgres.app](https://postgresapp.com/). - For other operating systems, follow the instructions from the [PostgreSQL website](https://www.postgresql.org/download/). 
2. **Run PostgreSQL**: - Ensure PostgreSQL is running on the default port (5432).

#### Clone the repository
```bash
git clone https://github.com/nitinkumar96/sky-sync
cd sky-sync
```
#### Environment Variables
Create the following `.env` files in their respective directories with the given contents:

1. `backend/booking-service/.env`
```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/bookingdb?schema=public"
KAFKA_URL='localhost:9092'
KAFKA_CLIENT_ID='booking-service'
KAFKA_TOPIC="booking-updates"
PORT=3012
```
2. `backend/booking-service/.env`
```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/flightdb?schema=public"
KAFKA_CLIENT_ID='flight-service'
KAFKA_BROKER='localhost:9092'
```
3. `backend/sky-sync-app/.env`
```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/skysyncdb?schema=public"
```
4. `backend/sky-sync-app/api-gateway/.env`
```bash
JWT_SECRET=<secret key>
PORT=3001
ADMIN_EMAIL=<admin email>
ADMIN_PASS=<admin password>
```
5. `backend/sky-sync-app/kafka-consumer/.env`
```bash
KAFKA_CLIENT_ID='my-consumer'
KAFKA_BROKER='localhost:9092'
```

#### Method 1: Using Docker
---

1. Run the docker command

```bash
docker-compose up --build
```
This will start all services defined in the `docker-compose.yml` file and run the necessary Prisma migrations.

#### Method 2: Manual Setup
---

1. Clone the repository
```bash
git clone https://github.com/nitinkumar96/sky-sync
cd sky-sync
```
2. Navigate to the `frontend` directory and install dependencies
```bash
cd frontend
npm install
npm run start
```
3. For the backend services, run `External Booking` Service
```bash
cd backend/booking-service 
npm install 
node src/app.js
```
4. Run `External Flight` Service
```bash
cd backend/flight-service 
npm install 
node src/app.js
```
5. Run `API Gateway` Service of backend application
```bash
cd backend/sky-sync-app/api-gateway
npm install 
node src/index.js
```
6. Run `Dashboard` Service of backend application
```bash
cd backend/sky-sync-app/services/dashboard-service
npm install 
node src/index.js
```
7. Run `Notification` Service of backend application
```bash
cd backend/sky-sync-app/services/notification-service
npm install 
node src/app.js
```
8. Run `Kafka Consumer` 
```bash
cd backend/sky-sync-app/kafka-consumer
npm install 
node src/app.js
```