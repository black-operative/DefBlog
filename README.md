# DefBlog : A platform for defence enthusiasts

This is my live project, it project aims to build a full-fledged blogging platform for Indian defence enthusiasts and junkies alike, demonstrating the integration of various advanced React concepts and external services to create a robust and functional web application. This application was influenced heavily by [Hitesh Chaduhary's MegaBlog project](https://github.com/hiteshchoudhary/chai-aur-react/tree/main/12MegaBlog).

## 🌟 Features

This project showcases the implementation of several key features essential for a modern blogging platform:

- User Authentication & Authorization: Secure user login, registration, and management of user roles (e.g., author, admin).
- Post Management: Create, read, update, and delete (CRUD) blog posts.
- Rich Text Editor Integration: Allow users to write and format blog content using a rich text editor.
- Image Uploads: Integrate functionality to upload and manage images associated with blog posts.
- Database Integration: Connect to a backend service to store and retrieve blog posts and user data.
- Frontend Routing: Implement client-side routing for seamless navigation between different pages (e.g., home, individual post, create post, dashboard).
- State Management: Utilize an effective state management solution for complex application state.
- Responsive Design: Ensure the application is usable and visually appealing across various devices.
- Form Handling and Validation: Robust handling of user input and validation for forms.

## 🚀 Technologies Used

- React.js: The core JavaScript library for building user interfaces.
- Vite: A fast build tool that provides a lightning-fast development experience for modern web projects.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- React Router DOM: For declarative routing in the React application.
- Redux Toolkit (or similar state management): For efficient and scalable state management (or Context API, depending on the lesson focus).
- Appwrite: A self-hosted backend-as-a-service platform for user authentication, database, and file storage.
- React Hook Form: For robust form management and validation.
- TinyMCE: A feature-rich rich text editor for blog post content.

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn (preferred package manager)

### Installation

- Clone the repository:

```Bash
git clone https://github.com/<>.git
cd <>
```

- Install dependencies:

```Bash
npm install
# or
yarn install
```

- Environment Variables

This project uses environment variables, likely for Appwrite configuration. Create a .env file in the root of the project directory based on the example below and fill in your Appwrite credentials:

```plaintext
VITE_APPWRITE_URL           = YOUR_APPWRITE_PROJECT_URL
VITE_APPWRITE_PROJECT_ID    = YOUR_APPWRITE_PROJECT_ID
VITE_APPWRITE_DATABASE_ID   = YOUR_APPWRITE_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID = YOUR_APPWRITE_COLLECTION_ID
VITE_APPWRITE_BUCKET_ID     = YOUR_APPWRITE_BUCKET_ID
```

- Running the Development Server

Start the development server:

```Bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to <http://localhost:5173> (or the port indicated in your terminal).

## 💡 Learning Objectives

I originally did this project as a go along but it turned into it's own thing pretty quick. Whether you clone this or Hitesh sir's original project, you re bound to learn the following :

- Setting up a complete React application with Vite.
- Integrating and configuring Tailwind CSS.
- Implementing user authentication and persistent login states.
- Connecting a React frontend with a BaaS (Backend-as-a-Service) like Appwrite.
- Handling file uploads and managing stored data.
- Building reusable components and managing application state.
- Implementing client-side routing with React Router DOM.
- Working with rich text editors in React.

## 🙏 Acknowledgements

- Hitesh Choudhary for creating the "Chai aur React" series and providing this invaluable learning resource.
- Appwrite team for helping me navigate production deployement and BaaS.
