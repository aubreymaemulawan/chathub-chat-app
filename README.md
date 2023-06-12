# ChatHub: Chat App

Click here to experience the app online -> [https://chathub-client.onrender.com]

![image](https://github.com/aubreymaemulawan/chathub-chat-app/assets/79576768/8646b17b-f87c-4e5f-83e3-d86ec53fd65f)
![image](https://github.com/aubreymaemulawan/chathub-chat-app/assets/79576768/927abfc4-572a-495f-abc5-045bf3f18f13)
![image](https://github.com/aubreymaemulawan/chathub-chat-app/assets/79576768/e3889193-92b6-4687-9887-1d8dee71fc7f)

## Technologies Used

- Frontend: React, Vite, and TailwindCSS
- Backend: Node/Express
- Authentication: MongoDB Realm
- Database: MongoDB
- Real-Time: Socket.io

## Basic Features

- The application allows users to register or log in using their email and password.
- Users have a profile page where they can update their avatar and display name.
- The application generates random avatars using the DiceBear API.
- The application includes a search feature.
- The chat functionality is real-time.
- An emoji picker is integrated into the chat.
- Users can create chat rooms to interact with others.
- Online status of users is displayed.
- Users have the option to enable dark mode.
- Real-time notifications are provided for incoming messages.
- Users can upload and send images.
- The chat history for each user is saved within the chat rooms.
- Users can add others as contacts.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies:
   - On Root Folder, Run client using `npm run install-client`.
   - On Root Folder, Run server using `npm run install-server`.
3. Uncomment these files to connect to my database & local server.
   - Navigate to the `client/src/services/ChatService.js` directory and uncomment `const base = "http://127.0.0.1:5000/";` then comment out `const base = "https://chathub-mkw2.onrender.com/";`.
   - Navigate to the `server/index.js` directory and uncomment `const originURL = "http://localhost:3000";` then comment out `const originURL = "https://chathub-client.onrender.com";`.
   - Navigate to the `client/src/components/chat/ChatRoom.jsx` directory and uncomment `const audio = new Audio("../../../public/audio/alert.mp3");` then comment out `const audio = new Audio("audio\\alert.mp3");`.
   - Navigate to the `client/src/components/chat/Message.jsx` directory and uncomment `const url = "http://127.0.0.1:5000/";` then comment out `const link = "https://chathub-mkw2.onrender.com/";`.
   - Navigate to the `server/.env` directory and uncomment `MONGO_URI`.
4. Run the server:
   - Make sure port `http://localhost:5000` is available.
   - On Root Folder, Run `npm run start-server`.
5. Build and Run the client:
   - Make sure port `http://localhost:3000` is available.
   - On Root Folder, Run `npm run build-client` then `npm run install-serve` then `npm run serve-client`.
6. The application will be accessible at `http://localhost:3000`.

Note: The keys included in the code are temporary and will be removed once the assessment is reviewed.
