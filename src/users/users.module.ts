import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from "./users.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { usersEmailConfDataSchema } from "src/schemas/usersEmailConfData.schema";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { RefreshRepository } from "../auth/refresh.repository";
import { EmailManager } from "../managers/email-maneger";
import {
  refreshTokensBlackListSchema
} from "../schemas/refresh.token.black.list.schema";
import { EmailAdapter } from "../managers/email.adapter";
import { testUsersSchema } from "../schemas/users.schema";


// import { usersProviders } from "./users.providers";

@Module({
  imports: [MongooseModule
    .forFeature(
      [
        { name: 'testUsersSchema', schema: testUsersSchema },
        { name: 'usersEmailConfDataSchema', schema: usersEmailConfDataSchema },
        { name: 'refreshTokensBlackListSchema', schema: refreshTokensBlackListSchema}])],

  controllers: [UsersController],
  // providers: [UsersService, UsersRepository, ...usersProviders,]
  providers: [UsersService, JwtService,  UsersRepository, RefreshRepository,
    EmailManager, EmailAdapter, AuthService]
})
export class UsersModule {}
