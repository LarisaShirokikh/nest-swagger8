import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EndpointsAttemptsTrysSchema } from "../schemas/endpoint.schema";
import {
  usersEmailConfDataSchema
} from "../schemas/usersEmailConfData.schema";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { testUsersSchema} from "../schemas/users.schema";
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";
import { EmailManager } from "../managers/email-maneger";
import { RefreshRepository } from "./refresh.repository";
import { EmailAdapter } from "../managers/email.adapter";
import {
  refreshTokensBlackListSchema
} from "../schemas/refresh.token.black.list.schema";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { BasicStrategy } from "./strategies/basic.strategy";

const models = [
  { name: 'endpointsAttemptsTrysSchema', schema: EndpointsAttemptsTrysSchema },
  { name: 'usersEmailConfDataSchema', schema: usersEmailConfDataSchema },
  { name: 'testUsersSchema', schema: testUsersSchema},
  //{ name: Users.name, schema: UsersSchema },
  { name: 'refreshTokensBlackListSchema', schema: refreshTokensBlackListSchema }
];

@Module({
  imports: [
    MongooseModule.forFeature(models),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, signOptions: { expiresIn: "60m" }
    })
  ],
controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, BasicStrategy,
    UsersService, UsersRepository, EmailManager, EmailAdapter, RefreshRepository],
  exports: [AuthService]
})
export class AuthModule {
}