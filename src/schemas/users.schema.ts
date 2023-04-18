// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document } from "mongoose";
//
//
//
// // export const UserSchema = new mongoose.Schema<UsersDBType>({
// //   accountData: {
// //     id: String,
// //     login: String,
// //     email: String,
// //     passwordHash: String,
// //     isConfirmed: Boolean,
// //     createdAt: Date
// //   },
// //   emailConfirmation: {
// //     email: String,
// //     confirmationCode: String,
// //     expirationDate: Date,
// //     isConfirmed: Boolean
// //   }
// // })
// export type AccountDataDocument = AccountData & Document
// @Schema()
// class AccountData {
//   @Prop()
//   id: String;
//   @Prop()
//   login: String;
//   @Prop()
//   email: String;
//   @Prop()
//   passwordHash: String;
//   @Prop()
//   isConfirmed: Boolean;
//   @Prop()
//   createdAt: Date
// }
//
// export type EmailConfirmationDocument = EmailConfirmation & Document
// @Schema()
// class EmailConfirmation {
//   @Prop()
//   email: String;
//   @Prop()
//   confirmationCode: String;
//   @Prop()
//   expirationDate: Date;
//   @Prop()
//   isConfirmed: Boolean
// }
//
// const AccountDataSchema = SchemaFactory.createForClass(AccountData)
// const EmailConfirmationSchema = SchemaFactory.createForClass(EmailConfirmation)
//
// export type UsersDocument = Users & Document
//
// @Schema()
// export class Users {
//   @Prop({type: AccountDataSchema})
//   accountData: AccountData
//   @Prop({type: EmailConfirmationSchema})
//   emailConfirmation: EmailConfirmation
// }
//
// export const UsersSchema = SchemaFactory.createForClass(Users);


import { UsersDBType } from "../users/users.repository";
import mongoose from "mongoose";

export const testUsersSchema = new mongoose.Schema<UsersDBType>( {
  accountData: {
    id: String,
    login: String,
    email: String,
    passwordHash: String,
    isConfirmed: Boolean,
    createdAt: Date,
  },
  emailConfirmation: {
    email: String,
    confirmationCode: String,
    expirationDate: Date,
    isConfirmed: Boolean
  }
});