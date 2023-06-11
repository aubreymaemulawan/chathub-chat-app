import axios from "axios";
import { APP_ID } from "../realms/constants";
import { App } from "realm-web";
import { io } from "socket.io-client";

const baseURL = "http://127.0.0.1:5000/api";
const app = new App(APP_ID);

const getUserToken = async () => {
  const user = app.currentUser;
  const token = user && (await user.accessToken.token);
  return token;
};

export const initiateSocketConnection = async () => {
  const socket = io("http://localhost:5000/");
  return socket;
};

const createHeader = async () => {
  const token = await getUserToken();

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

const createHeaderImage = async () => {
  const token = await getUserToken();
  const payloadHeader = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export const getAllUsers = async () => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/user`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (userId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/user/${userId}`, header);
    return res.data[0];
  } catch (e) {
    console.error(e);
  }
};

export const getUsers = async (users) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/user/users`, users, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatRooms = async (userId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/room/${userId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(
      `${baseURL}/room/${firstUserId}/${secondUserId}`,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const createChatRoom = async (members) => {
  const header = await createHeader();

  try {
    const res = await axios.post(`${baseURL}/room`, members, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getMessagesOfChatRoom = async (chatRoomId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/message/${chatRoomId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const sendMessage = async (messageBody) => {
  const header = await createHeaderImage();

  try {
    const res = await axios.post(`${baseURL}/message`, messageBody, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateProfile = async (userId, data) => {
  const header = await createHeader();
  try {
    const res = await axios.post(
      `${baseURL}/user/profile/${userId}`,
      data,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
