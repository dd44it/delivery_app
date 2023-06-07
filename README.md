# Delivery app
## Prerequisites

- Node.js (version 18.10.0)
- Angular CLI (version 15.2.7)
- MongoDB Compass

## Installation

1. **Clone the Repository:** 
   - Download the repository to your local computer.
   - Open the repository in your preferred code editor.

2. **Install Frontend Dependencies:**
   - Open a terminal or command prompt.
   - Navigate to the repository folder.
   - Run the following command to install the frontend node modules:
     ```
     npm install
     ```
   - This command will fetch and install all the required dependencies for the frontend.

3. **Install Backend Dependencies:**
   - Change directory to the `server` folder:
     ```
     cd server
     ```
   - Run the following command to install the backend Node modules:
     ```
     npm install
     ```
   - This command will fetch and install all the required dependencies for the backend.

4. **Connect to MongoDB:**
   - Start the MongoDB server using MongoDB Compass.
   - Open MongoDB Compass.
   - Connect to the MongoDB server at `localhost:27017`.
   - If the MongoDB server is running on a different host or port, please update the connection details accordingly in the application's configuration files.

5. **Finalizing the Setup:**
   - If any errors or issues occur during the installation process, please fix them accordingly.
   - Ensure that all the required dependencies are successfully installed without any errors.

## Running the Application

Once you have completed the installation steps, you can now run the application locally using the following instructions:

1. **Start the Backend Server:**
   - Open a terminal or command prompt.
   - Navigate to the `server` folder.
   - Run the following command to start the backend server:
     ```
     npm start
     ```
   - The server should now be running on a specified port, as mentioned in the application documentation.

2. **Start the Frontend Application:**
   - Open a new terminal or command prompt.
   - Navigate to the repository folder.
   - Run the following command to start the frontend application, for this command you need install angular cli:
     ```
     ng serve
     ```
     Or you can just type this command
     ```
     npm start
     ```

   - The Angular CLI will build the application and start a local development server.
   - Once the build process is complete, the application should be accessible on `http://localhost:4200` in your web browser.
