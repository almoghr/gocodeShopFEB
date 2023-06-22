import {
  addSingleUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} from "../services/User.js";
import { comparePassWithDBPass, hashPass } from "../utils/hashPassword.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).send("there is no user with the id providen");
    }
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const addSingleUserController = async (req, res) => {
  try {
    const newUser = { ...req.body };
    if (Object.keys(newUser).length === 0) {
      res.status(400).send("bad request");
    }
    const hashedPassword = await hashPass(req.body.password)
    newUser.password = hashedPassword
    const user = await addSingleUser(newUser);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const updateUserController =  async (req, res) => {
    const userAllowedUpdates = ["username"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      userAllowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      res.status(400).send({ message: "Invalid updates" });
    }
  
    try {
      const id = req.params.id;
      const user = await getUserById(id);
      if (!user) {
        res.status(404).send({ message: "user does not exist" });
      }
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      res.status(200).send(user);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }

  export const deleteUserController =  async (req, res) => {
    try {
      const id = req.params.id;
      const deletedUser = await deleteUser(id);
  
      if (!deletedUser) {
        res.status(404).send({ message: "user does not exist" });
      }
  
      res.status(200).send(deletedUser);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }

  export const loginUser = async (req,res) => {
    try{
      const {email, password} = req.body;
      const foundUser = await getUserByEmail(email)
      if(!foundUser){
        res.status(404).send({ message: "user does not exist" });
      }
      console.log(foundUser)
      const isUserVerified = await comparePassWithDBPass(password, foundUser.password)
      if(!isUserVerified){
        res.status(401).send({ message: "password does not match" });
      }
      const userToFront = {email: foundUser.email, username: foundUser.username, _id: foundUser._id}
      res.status(200).send(userToFront)

    } catch(e){
      console.log(e)
    }
  }