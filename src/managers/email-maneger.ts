import { Injectable } from "@nestjs/common";
import { EmailAdapter } from "./email.adapter";


@Injectable()
export class EmailManager {
constructor(
  private readonly emailAdapter: EmailAdapter
){}

  async sendPasswordRecoveryMessage() {
    await this.emailAdapter
      .sendEmail(
        "user.email",
        "password recovery",
        "<div>${user.recoveryCode}message</div>"
      )
  }


  async sendEmailConfirmationCode(conformationCode: string, email: string) {
    await this.emailAdapter.resendEmail(email,
      "Confirm your email",
      conformationCode
    )

  }

  async sendEmailConfirmation(email: string) {
    await this.emailAdapter.resendEmail(email, "Your Email was confirmed",
      ` <h3> Your Email was confirmed</h3>`)

  }
}