// import auth from "../config/firebase-config.js";

// export const getAllUsers = async (req, res) => {
//   const maxResults = 10;
//   let users = [];

//   try {
//     const userRecords = await auth.listUsers(maxResults);

//     userRecords.users.forEach((user) => {
//       const { uid, email, displayName, photoURL } = user;
//       users.push({ uid, email, displayName, photoURL });
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getUser = async (req, res) => {
//   try {
//     const userRecord = await auth.getUser(req.params.userId);

//     const { uid, email, displayName, photoURL } = userRecord;

//     res.status(200).json({ uid, email, displayName, photoURL });
//   } catch (error) {
//     console.log(error);
//   }
// };
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { user_id: req.params.userId },
      {
        username: req.body.username,
        photoURL: req.body.photoURL,
      }
    );
    res.status(201).json("Updated");
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json("Logged in");
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({}).limit(10);
    res.status(200).json(user);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find({
      user_id: req.params.userId,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
