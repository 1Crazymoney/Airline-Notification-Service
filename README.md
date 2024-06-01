### Airline Notification Service using RabbitMQ

This project utilizes RabbitMQ as a message broker to handle asynchronous communication and notifications, which helps in decoupling the main application processes from notification handling, thus enhancing performance and scalability.

#### Overview:
- **RabbitMQ**: A message broker that allows applications to communicate asynchronously through message queues.
- **Purpose**: Used in this project to manage notifications such as emails or push notifications without blocking main application operations.

#### Setup and Configuration:
- Ensure RabbitMQ is installed on your system. You can download it from [RabbitMQ Official Website](https://www.rabbitmq.com/download.html). 
- Install `amqplib` using npm:
```
npm install amqplib

```