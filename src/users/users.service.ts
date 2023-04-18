import { Injectable } from '@nestjs/common';
import { UsersRepository } from "./users.repository";


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  // async create(login: string, password: string, email: string) {
  //   return await this.usersRepository.create({})
  // }

  // async getCount() {
  //
  //   return await this.usersRepository.getCount()
  // }
  async deleteUsers(id: string) {

    return await this.usersRepository.deleteUsers(id)
  }
  async getAllUsers(searchLoginTerm: string,
                    searchEmailTerm: string, pageNumber: number,
                    pageSize: number, sortBy: string, sortDirection: string) {
    return await this.usersRepository.getAllUsers(searchLoginTerm, searchEmailTerm,
      pageNumber, pageSize,
      sortBy, sortDirection)
  }
}
