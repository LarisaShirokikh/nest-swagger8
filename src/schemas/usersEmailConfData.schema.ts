import mongoose from "mongoose";
import { UsersEmailConfDataType } from "../users/users.repository";

export const usersEmailConfDataSchema = new mongoose.Schema<UsersEmailConfDataType>({

    confirmationCode: String,
    expirationDate: Date,
    isConfirmed: Boolean


});

