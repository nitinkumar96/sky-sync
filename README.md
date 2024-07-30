# SkySync
## Flight Status & Updates

### Home Page
![Home Page](frontend/src/assets/homepage.png)

### PPT Link
[![Google Slides Presentation](https://docs.google.com/presentation/d/1FXYXTvvcmCBKxCVHrZVLlikIwCbh0LiQ_8O8qBPUqkA/edit?usp=sharing)]
---

### Overview
SkySync is a comprehensive flight status and notifications system designed to provide real-time updates on flight statuses, including delays, cancellations, and gate changes. Built using a microservices architecture, the application leverages external services for flight and booking information, ensuring passengers receive accurate and timely notifications.

The architecture consists of multiple microservices, including an API Gateway, Dashboard Service, Notification Service, Flight Service, and Booking Service, all communicating via Kafka for efficient data handling. This design allows for seamless scalability and decoupling of services, enabling the system to handle high loads while maintaining performance.

---

### Tech Stack
- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Prisma ORM
- **Message Broker:** Kafka
- **Notifications:** Twilio (SMS), Nodemailer (Email)

![React](https://img.icons8.com/color/48/000000/react-native.png)
![Node.js](https://img.icons8.com/color/48/000000/nodejs.png)
![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png)
![Kafka](https://img.icons8.com/color/48/000000/apache-kafka.png)

---

### Steps to Run the Application

#### Method 1: Using Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sky-sync.git
   cd sky-sync
   docker-compose up --build
   ```