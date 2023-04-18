import { Controller } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";


@Controller()
export class AppController {
  constructor(private authService: AuthService
  ) {
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }


  // @UseGuards(LocalAuthGuard)
  // @Post("auth/login")
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("profile")
  // async getProfile(@Request() req) {
  //   return req.user;
  //
  // }
  //
  // @UseGuards(BasicAuthGuard)
  // @Get("for-sa")
  // async isSuperAdmin() {
  //   return { ok: true }
  // }
}
