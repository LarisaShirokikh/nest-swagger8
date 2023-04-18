import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { add } from 'date-fns'
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UsersDBType, UsersRepository} from "../users/users.repository";
import { v4 as uuidv4 } from "uuid";
import { RefreshRepository } from "./refresh.repository";
import { EmailManager } from "../managers/email-maneger";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly refreshRepository: RefreshRepository,
    private emailManager: EmailManager,
    //private authRepository: AuthRepository
  ) {
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersRepository.findUserByLogin(login);
    if (!user) return null
    const validPassword = await bcrypt.compare(password, user.accountData.passwordHash);
    if (validPassword) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async userRegistration(login: string, email: string, password: string) {
    console.log(bcrypt);
    const salt = await bcrypt.genSalt(10);
    console.log(salt, password);

    const passwordHash = await bcrypt.hash(password, salt);
    console.log(222);
    const newUser: UsersDBType = {
      accountData: {
        id: uuidv4(),
        login,
        email,
        passwordHash,
        isConfirmed: false,
        createdAt: new Date(),
      },
      emailConfirmation: {
        email,
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), {
          hours: 3,
        }),
        isConfirmed: false
      }
    };
    await this.usersRepository.createUser(newUser);
    await this.usersRepository.insertDbUnconfirmedEmail(newUser.emailConfirmation);

    await this.emailManager.sendEmailConfirmationCode(newUser.emailConfirmation.confirmationCode, email);
    return newUser;

  }

  async userRegConfirmation(confirmationCode: string): Promise<boolean> {
    const user = await this.usersRepository.findUserByConfirmCode(confirmationCode);
    if (!!user.emailConfirmation && user.emailConfirmation.isConfirmed === false) {
      const result = await this.usersRepository.updateEmailConfirmation(user.emailConfirmation.email);
      if (result) {
        await this.emailManager.sendEmailConfirmation(user.emailConfirmation.email);
      }
      return true;
    } else {
      return false;
    }
  }

  async resendingEmailConfirm(email: string) {
    // const user = await this.usersRepository.findUserByEmail(email);
    // if (!user) return false;
    // if (user?.emailConfirmation.isConfirmed === true) return false;
    // const newEmailConfirmation = {
    //   email,
    //   confirmationCode: uuidv4(),
    //   expirationDate: add(new Date(), {
    //     hours: 3,
    //     minutes: 3
    //   }),
    //   isConfirmed: false
    // };
    //
    // await this.usersRepository.updateUnconfirmedEmailData(newEmailConfirmation);
    //
    // await this.emailManager.sendEmailConfirmationCode(newEmailConfirmation.confirmationCode, email);
    // return true;
  }

  async checkCredentials(login: string, password: string) {
    const user = await this.usersRepository.findUserByLogin(login);
    if (!user) return null;
    const validPassword = await bcrypt.compare(password, user.accountData.passwordHash);
    if (validPassword) return user;
    return false;
  }

  async checkTokenInBlackList(refreshToken: string) {
    return this.refreshRepository.checkTokenInBlackList(refreshToken);
  }

  async addRefreshTokenToBlackList(refreshToken: string) {
    const result = await this.refreshRepository.addRefreshTokenToBlackList(refreshToken);

    return result;
  }

  async findUserById(userId: string): Promise<User> {
    return this.usersRepository.findUserWithEmailById(userId);

  }



  async aboutMe() {
    // const authHeader = header.authorization;
    // if (!authHeader) return;

    // const token = authHeader!.split(" ")[1];
    // const userId = await this.jwtService.getUserIdByToken(token);
    // const user = await this.usersRepository.findUserById(userId);

    // return ({
    //   email: user.accountData.email,
    //   login: user.accountData.login,
    //   userId: user.accountData.id
    // });

  }
}
