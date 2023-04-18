import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegistrationDto } from "./dto/registration.dto";





@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post('/registration-confirmation')
  //checkLimitsIPAttemptsMiddleware
  async registrationConfirmation(@Body() code: string) {
    return this.authService.userRegConfirmation(code)
  }

  @Post('/registration')
  // loginValidation, emailValidation, passwordValidation, inputValidationMiddleWare,
  // checkLimitsIPAttemptsMiddleware,
   async registration(@Body() registrationDto:  RegistrationDto) {
    return this.authService
      .userRegistration(registrationDto.login, registrationDto.email, registrationDto.password)
  }

  @Post('/registration-email-resending')
  //emailValidation, inputValidationMiddleWare, checkLimitsIPAttemptsMiddleware,
  async resendingEmailConfirm(@Body() email: string) {
    return this.authService.resendingEmailConfirm(email)
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  // loginValidation, passwordValidation,
  // inputValidationMiddleWare,
  // checkLimitsIPAttemptsMiddleware,
  async loginUser(@Body() login: string, password: string) {
     return this.authService.checkCredentials(login, password)
  }

  @Get('/me')
  //authBearer
  async aboutMe() {
    return this.authService.aboutMe()
  }

}