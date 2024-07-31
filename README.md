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
-

The architecture consists of multiple microservices, including an API Gateway, Dashboard Service, Notification Service, Flight Service, and Booking Service, all communicating via Kafka for efficient data handling. This design allows for seamless scalability and decoupling of services, enabling the system to handle high loads while maintaining performance.

---

### Tech Stack 

- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Prisma ORM
- **Message Broker:** Kafka
- **Notifications:** Twilio (SMS), Nodemailer (Email)
---
### SOLUTION APPROACH

The system is built around a microservices architecture, which allows for scalability and decoupling of components. By integrating external services, the application can provide accurate and up-to-date flight information.

### Key Components:

1.  **External Services**:
    
    -   **Flight Service**: Represents a remote airport database that provides real-time flight status updates.
    -   **Booking Service**: Represents an external system handling flight bookings.
2.  **Internal Application**:
    
    -   **API Gateway**: Centralized management of API requests, allowing for rate limiting, request aggregation, and improved security.
    -   **Dashboard Service**: Manages user and admin dashboards, facilitating access to flight and booking data.
    -   **Notification Service**: Sends notifications to users via SMS, email, or push notifications based on their preferences.

### Database

-   **PostgreSQL** is chosen for its structured data handling capabilities, allowing for efficient queries and well-defined schemas. Prisma ORM is used for smooth migrations and schema management.

*The internal database consists of the following tables:*

-   **Flight Table**: Stores flight information, including status, departure, and arrival details.
-   **Booking Table**: Stores booking records, including passenger details and flight IDs.
-   **Passenger Table**: Contains passenger information and preferences for notifications.

### Messaging System

-   **Kafka** plays a crucial role in managing communication between services and handling notifications. It facilitates real-time updates and scales efficiently during high load situations.
  
---
### WORKFLOW
-   The application assumes the availability of external flight and booking services with support for webhooks.
-   **Data Updates from External Services**:
    
    -   The external Flight Service and Booking Service provide real-time updates via webhooks.
    -   Changes such as new flight statuses or bookings are published to Kafka topics.
-   **Kafka Consumers**:
    
    -   The internal application contains consumers that listen for messages on relevant Kafka topics.
    -   For new flight statuses, the consumer updates the local flight table and triggers notifications.
    -   For new bookings, the consumer adds booking details to the database and checks for existing passenger records.
-   **User Interaction**:
    
    -   Users can check flight statuses by entering their PNR and email on the homepage.
    -   The application queries the internal database to retrieve flight status information based on user input.
    -   A dashboard displays upcoming flights and allows users to manage notification preferences (SMS, email, push).
-   **Notification Service**:
    
    -   The Notification Service processes notifications based on passenger preferences.
    -   It utilizes Twilio for SMS notifications and Nodemailer for email notifications.
    -   Notifications are sent out to users based on their chosen preferences.
---
### ENHANCEMENTS

   -   Advanced analytics and reporting features.
    -   Integration with additional notification services like Firebase Cloud Messaging or AWS SNS.
    -   Implementation of a reminder feature for upcoming flights, sending notifications days/hours before departure.

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

git  clone  https://github.com/nitinkumar96/sky-sync

cd  sky-sync

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