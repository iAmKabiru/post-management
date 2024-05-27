# Post Management Application

This is a simple post management application built with NestJS, React, and MySQL, Dockerized for easy deployment.


## Getting Started

1. Clone this repository:

    ```bash
    git clone https://github.com/iAmKabiru/post-management.git
    cd post-management
    ```

2. Build the Docker containers:

    ```bash
    docker-compose build
    ```

3. Run the database migration:

    ```bash
    docker-compose up migration
    ```

    This command will execute the database migrations to set up the database schema.

4. Start the application:

    ```bash
    docker-compose up
    ```

    This command will start the frontend, backend, and database containers.

6. Access the application:

    - The frontend will be accessible at `http://localhost:3000`.
    - The backend will be accessible at `http://localhost:4000`.

## Additional Commands

- To stop the application, press `Ctrl + C` in the terminal where `docker-compose up` is running.
- To remove the containers, networks, and volumes created by Docker Compose, run:

    ```bash
    docker-compose down
    ```
