import mongoose from "mongoose";
import { EndpointsAttemptsTrysType } from "../types/endpoint.attempts.type";

export const EndpointsAttemptsTrysSchema = new mongoose.Schema<EndpointsAttemptsTrysType> ({


  userIp: String,
  url: String,
  time: Date

})


