import mongoose from "mongoose";
import { RefreshTokensBlackListType } from "../types/refresh.token.type";


export const refreshTokensBlackListSchema = new mongoose.Schema<RefreshTokensBlackListType>(
  {
    refreshToken: String

  });

