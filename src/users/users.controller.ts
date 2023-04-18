import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from "../auth/auth.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private authService: AuthService) {}

  @Post()
  create(@Body() login: string, email: string, password: string) {
    return this.authService.userRegistration(login, email, password)
    //return this.usersService.create(createUserDto);
  }

  @Get()
  getAll(@Param() searchLoginTerm: string,
         searchEmailTerm: string, pageNumber: number,
         pageSize: number, sortBy: string, sortDirection: string) {
    return this.usersService
      .getAllUsers(searchLoginTerm, searchEmailTerm,
        pageNumber, pageSize,
        sortBy, sortDirection);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUsers(id);
  }
}
