# Web-I3

[![](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)
[![](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://swagger.io/)
[![](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vite.dev/)
[![](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)](https://vuejs.org/)
[![](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![](https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![](https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=Vitest&logoColor=%23fcd703)](https://vitest.dev/)
[![](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github%20Pages&logoColor=white)](https://pages.github.com/)


## Demonstration

To demonstrate the viability of this solution, a demo version has been deployed from this GitHub repository.  
The PostgreSQL database is deployed on [neon.tech](https://neon.tech/), the back-end on [Fly.io](https://fly.io/), and the front-end on [GitHub Pages](https://pages.github.com/).  
API URL (back-end): <https://web-i3-back.fly.dev/>  
Website URL (front-end): <https://yoyo53.github.io/web-I3/>


## Installation

This web application has been developed in an n-tier architecture, meaning it consists of three distinct parts that can be deployed independently (potentially on different servers):
- The database used by the application (PostgreSQL)

- The back-end (an Express.js API to interact with the database)

- The front-end (a static website that interacts with the API)


### Setting Up the PostgreSQL Database

1. Create a new PostgreSQL instance on your preferred hosting provider (or on your own server).

2. In this instance, create a new database and a new user with full permissions on this database.

3. Save the PostgreSQL connection URL for the following steps.


### Deploying the Back-End

Make sure you have Node.js and Git installed on your machine before starting.


\
**Step 1: Clone the GitHub Repository**

1. Open a command line or terminal.

2. Navigate to the directory where you want to clone the project.

3. Run the following command to clone the repository from GitHub:
    ```bash
    git clone https://github.com/yoyo53/web-I3.git
    ```


\
**Step 2: Configure the Back-End**

1. Go to the back-end directory:
    ```bash
    cd web-I3/back
    ```

2. Run the following command to install dependencies:
    ```bash
    npm install
    ```

3. Run the following command to initialize the Prisma ORM:
    ```bash
    npm run build
    ```


\
**Step 3: Configure Environment Variables**

1. In the back-end directory, locate a file named `.env.example`.

2. Duplicate this file and rename the copy to `.env`.

3. Open the `.env` file in a text editor.

4. Configure the environment variables as follows:
    - POSTGRES_URL => the URL of the database created earlier

    - SECRET_KEY => the encryption key for authentication tokens

    - DEFAULT_PASSWORD => the default password for newly created accounts


\
**Step 4: Run the Back-End**

1. Run the following command to start the server:
    ```bash
    npm run start
    ```

    The back-end server is now running.


### Deploying the Front-End

Make sure you have Node.js and Git installed on your machine before starting. If deploying on the same machine as the back-end, start directly at Step 2.


\
**Step 1: Clone the GitHub Repository**

1. Open a command line or terminal.

2. Navigate to the directory where you want to clone the project.

3. Run the following command to clone the repository from GitHub:
    ```bash
    git clone https://github.com/yoyo53/web-I3.git
    ```


\
**Step 2: Configure the Front-End**

1. Go to the front-end directory:
    ```bash
    cd web-I3/front
    ```

2. Run the following command to install dependencies:
    ```bash
    npm install
    ```


\
**Step 3: Configure Environment Variables**

1. In the front-end directory, locate a file named `.env.example`.

2. Duplicate this file and rename the copy to `.env`.

3. Open the `.env` file in a text editor.

4. Configure the environment variables as follows:
    - VITE_BASE_PATH => the base path of the front-end application

    - VITE_API_URL => the URL of the back-end server

    - VITE_URL => the URL of the front-end website


\
**Step 4: Compile the Front-End**

1. Run the following command to compile the front-end into a static website:
    ```bash
    npm run build
    ```

   The result of this compilation will be available in the `dist` folder. The contents of this folder can then be deployed as a static website on your preferred web hosting provider.
