import { User } from "../models/User.js";

export const getAllUsers = () => {
    console.log(2)
    return User.find({});
}

export const getUserById = (id) => {
    return User.findOne({_id:id})
}

export const getUserByEmail = (email) => {
    return User.findOne({email}).select("-__v")
}

export const addSingleUser = async (newUser) => {
    const user = new User(newUser)
    await user.save()
    return user
}

export const deleteUser = (id) => {
    return User.findOneAndDelete({_id:id})
}
