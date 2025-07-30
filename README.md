# Pest Assist Chatbot

This is a Next.js application that provides a chatbot interface for pest control assistance. It includes an admin dashboard for managing conversations, knowledge base, leads, and orders.

## Features

-   **Chatbot Interface:** A user-friendly chat interface for customers to interact with the pest control assistant.
-   **AI-Powered Conversations:** Uses Genkit to power the chatbot's conversational abilities.
-   **Knowledge Base:** A system for retrieving information about pest control.
-   **Lead Qualification:** A form for qualifying new leads.
-   **Admin Dashboard:** A comprehensive dashboard for managing the application's data.

## Getting Started

### Prerequisites

-   Node.js (v20 or later)
-   npm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/pest-assist-chatbot.git
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

### Running the Development Server

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the Next.js development server on `http://localhost:9002`.

To run the Genkit development server, use the following command:

```bash
npm run genkit:dev
```

## Project Structure

-   `src/app`: The main application code, including the admin dashboard and chat interface.
-   `src/ai`: The Genkit AI flows for conversation, lead qualification, and knowledge retrieval.
-   `src/components`: Reusable React components used throughout the application.
-   `src/hooks`: Custom React hooks.
-   `src/kb`: The knowledge base documents in Markdown format.
-   `src/lib`: Utility functions and mock data.

## Available Scripts

-   `npm run dev`: Starts the Next.js development server.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the code using Next.js's built-in ESLint configuration.
-   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## Key Technologies

-   [Next.js](https://nextjs.org/)
-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Genkit](https://firebase.google.com/docs/genkit)
-   [Shadcn/ui](https://ui.shadcn.com/)