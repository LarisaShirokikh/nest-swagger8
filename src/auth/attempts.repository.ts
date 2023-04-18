import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UsersEmailConfDataType } from "../users/users.repository";
import { EndpointsAttemptsTrysType } from "../types/endpoint.attempts.type";

@Injectable()
export class AttemptsRepository {
  constructor(
    @InjectModel('usersEmailConfDataSchema')
              private UsersEmailConfDataModel: Model<UsersEmailConfDataType>,
    @InjectModel('endpointsAttemptsTrysSchema')
              private EndpointsAttemptsTrysModel: Model<EndpointsAttemptsTrysType>) {
  }

  async getLastAttempts(ip: string, url: string, limitTime: Date): Promise<number> {
    const countAttempts = await this.UsersEmailConfDataModel.countDocuments({
      userIP: ip,
      url,
      time: {$gt: limitTime}
    })
    return countAttempts
  }

  async addAttempt(userIP: string, url: string, time: Date) {
    const result = await this.EndpointsAttemptsTrysModel.insertMany({ userIP, url, time})
    return result
  }

  async deleteAllAttempts(): Promise<boolean> {
    const result = await this.EndpointsAttemptsTrysModel.deleteMany({})
    return true
  }
}