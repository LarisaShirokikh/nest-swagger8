import { Injectable, UnauthorizedException } from "@nestjs/common";
import { BasicStrategy as Strategy } from "passport-http";
import { PassportStrategy } from "@nestjs/passport";
import { basicConstants } from "../constants";


@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super()
  }

  public validate = async (username, password): Promise<boolean> => {
    if (
      basicConstants.userName === username &&
      basicConstants.password === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  }
}