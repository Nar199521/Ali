# Full Stack E-Commerce Website

This is a full-stack e-commerce website built with Next.js, TypeScript, and Tailwind CSS. It includes a complete set of features for a modern online store, from product listings and user authentication to a fully functional shopping cart and admin dashboard.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm start`: Starts the application in production mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Docker Deployment

This project is configured for Docker deployment, making it easy to run in a containerized environment.

### Prerequisites

- Docker installed on your machine.

### Building the Docker Image

To build the Docker image for this project, run the following command in your terminal:

```sh
   docker-compose build
```

### Running the Application with Docker

Once the image is built, you can start the application by running:

```sh
   docker-compose up -d
```

This will start the application in detached mode, and it will be accessible at http://localhost:3000.

## Environment Variables

This project uses environment variables to manage configuration settings. You will need to create a `.env.local` file in the root of your project and add the necessary variables.

### ShurjoPay

To enable ShurjoPay payments copy `.env.example` to `.env.local` and set the ShurjoPay values:

- `SHURJOPAY_BASE_URL` — ShurjoPay API base (sandbox/production)
- `SHURJOPAY_VENDOR_ID` — your vendor id
- `SHURJOPAY_SECRET` — your secret key
- `SHURJOPAY_RETURN_URL` — payment return URL (optional)

The app exposes two server routes:

- `POST /api/checkout` — create an order and initiate a ShurjoPay payment
- `GET /api/payment/verify` — endpoint for ShurjoPay to return the payment result

Note: The helper `src/lib/shurjopay.ts` contains the minimal provider calls. Adjust payloads and verification logic to match the exact ShurjoPay API spec for your account.
