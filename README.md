
# SkySync : Flight Status & Updates  

### Home Page

![Home Page](frontend/src/assets/homepage.png)

  

### PPT Link
[**SkySync PPT - Google Slides Presentation**](https://docs.google.com/presentation/d/1FXYXTvvcmCBKxCVHrZVLlikIwCbh0LiQ_8O8qBPUqkA/edit?usp=sharing)

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

  

### Steps to Run the Application

  

#### Method 1: Using Docker
---

1. Clone the repository:

```bash
git clone https://github.com/nitinkumar96/sky-sync
cd sky-sync
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