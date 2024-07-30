# SkySync
## Flight Status & Updates

![Home Page](frontend/src/assets/homepage.png)

[![Google Slides Presentation](https://img.icons8.com/ios-filled/50/000000/google-slides.png)](YOUR_GOOGLE_SLIDES_LINK)
[![Google Docs](https://img.icons8.com/ios-filled/50/000000/google-docs.png)](YOUR_GOOGLE_DOCS_LINK)

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