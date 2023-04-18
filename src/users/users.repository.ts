import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import "reflect-metadata";
import { usersEmailConfDataSchema } from "../schemas/usersEmailConfData.schema";
import { User } from "./entities/user.entity";
import { testUsersSchema } from "../schemas/users.schema";
// import { Users, UsersDocument } from "../schemas/users.schema";



export type UsersType = {

  id: string,
  login: string,
  email: string,
  passwordSalt: string,
  passwordHash: string
  createdAt: any,
}

export type UsersEmailConfDataType = {

  email: string,
  confirmationCode: string,
  expirationDate: Date,
  isConfirmed: boolean
}

export type UsersDBType = {
  accountData: {
    id: string,
    login: string,
    email: string,
    passwordHash: string,
    createdAt: Date,
    isConfirmed: boolean
  },
  emailConfirmation: {
    email: string,
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean
  }
}

@Injectable()
export class UsersRepository {
  constructor(
    // @InjectModel(Users.name)
    //           private usersModel: Model<UsersDocument>,
    @InjectModel('testUsersSchema') private usersModel: Model<UsersDBType>,
    @InjectModel('usersEmailConfDataSchema')
              private usersEmailConfDataModel: Model<UsersEmailConfDataType>
  ) {
  }

  async createUser(user: UsersDBType) {
     await this.usersModel.insertMany([user]);
    //return newUser.save();

  }

  async getAllUsers(searchLoginTerm: string,
                    searchEmailTerm: string, pageNumber: number,
                    pageSize: number, sortBy: string, sortDirection: string) {
    return this.usersModel
      .find({}, { _id: 0, passwordHash: 0, passwordSalt: 0 } )
      .skip((pageNumber - 1) * pageSize).limit(pageSize).lean([]);
  }

  async getCount() {
    return this.usersModel.countDocuments();
  }

  async deleteUsers(id: string) {
    const result = await this.usersModel.deleteOne({ id: id });
    return result.deletedCount === 1;
  }

  // async findUsersById(userId: string) {
  //   return this.usersModel.findOne({ id: userId }, { _id: 0 });
  // }

  async findUserByConfirmCode(confirmationCode: string) {
    const emailData = await this.usersEmailConfDataModel
      .findOne({ confirmationCode: confirmationCode }, { _id: 0 });
//@ts-ignore
    const accountData = await this.usersModel.findOne({ email: emailData?.email }, { _id: 0 });

    if (emailData === null && accountData === null) {
      const user = {
        accountData: undefined,
        emailConfirmation: undefined
      };
      return user;
    } else {
      const user = {
        accountData,
        emailConfirmation: emailData
      };
      return user;
    }
  }

  async updateEmailConfirmation(email: string) {
    const accountDataRes = this.usersModel
      .updateOne({ email }, { isConfirmed: true });
    if (!accountDataRes) {
      return null;
    } else {
      await this.usersEmailConfDataModel.deleteOne({ email });
      const result = await this.usersModel.findOne({ email }, { _id: 0, password: 0, email: 0, isConfirmed: 0 });
      return result;
    }

  }

  async findUserByEmail(email: string): Promise<User> {
    return  this.usersModel.findOne({ email }, { _id: 0 } );

  }

  async findUserByLogin(login: string) {
    const user = await this.usersModel.findOne({ "accountData.login": login });

    if (user === null) return false;
    return user;
  }

  async insertDbUnconfirmedEmail(newUserEmail: UsersEmailConfDataType) {
    const insertDb = await this.usersEmailConfDataModel.create(newUserEmail);
    return insertDb.save();
  }

  async updateUnconfirmedEmailData(updetedEmailConfirmationData: UsersEmailConfDataType): Promise<boolean> {
    const result = await this.usersEmailConfDataModel.updateOne(
      { email: updetedEmailConfirmationData.email },
      {
        $set: {
          confirmationCode: updetedEmailConfirmationData.confirmationCode,
          expirationDate: updetedEmailConfirmationData.expirationDate
        }
      });
    return result.acknowledged;
  }

  // async deleteAllUsers(): Promise<boolean> {
  //   await this.usersModel.deleteMany({});
  //   return true;
  //
  // }

  // async findUserByEmailOrlogin(email: string, login: string) {
  //   const user = await this.usersModel
  //     .findOne({ $or: [{ "accountData.login": login }, { "accountData.email": email }] });
  //   console.log(user);
  //   if (!user) return null;
  //   return user;
  //
  // }

  async findUserWithEmailById(userId: string) {
    const user = await this.usersModel.findOne({ id: userId }, { _id: 0, password: 0, isConfirmed: 0, __v: 0 });

    return user;
  }


}

