import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UsersEmailConfDataType } from "../users/users.repository";
import { refreshTokensBlackListSchema } from "../schemas/refresh.token.black.list.schema";
import { RefreshTokensBlackListType } from "../types/refresh.token.type";

@Injectable()
export class RefreshRepository {
  constructor(
    @InjectModel("usersEmailConfDataSchema")
    private UsersEmailConfDataModel: Model<UsersEmailConfDataType>,
    @InjectModel("refreshTokensBlackListSchema")
    private RefreshTokensBlackListModel: Model<RefreshTokensBlackListType>) {
  }

  async addRefreshTokenToBlackList(token: string) {
    const result = await this.RefreshTokensBlackListModel.insertMany([{ refreshToken: token }]);
    return result;
  }

  async checkTokenInBlackList(refreshToken: string) {
    const result = await this.RefreshTokensBlackListModel.findOne({ refreshToken });
    return result;
  }

  async deleteAllTokensInBlackList(): Promise<boolean> {
    await this.RefreshTokensBlackListModel.deleteMany({});
    return true;
  }
}