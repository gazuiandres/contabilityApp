import nodemailer from 'nodemailer';
import boom from '@hapi/boom';
import { EmailInfoDto, EmailDataDto } from './email.dto';

import changeEmailTemplate from './templates/changeEmail.template';
import changePasswordTemplate from './templates/changePassword.template';

class SendEmailClass {
  private from: string;
  constructor(private user: string, private password: string, private host: string) {
    this.from = `Contability App <${this.user}>`;
  }

  async sendEmail(emailData: EmailDataDto): Promise<void> {
    const transport = nodemailer.createTransport({
      host: this.host,
      secure: true,
      port: 465,
      auth: {
        user: this.user,
        pass: this.password,
      },
    });

    await transport.sendMail(emailData);
  }

  async recoveryEmail(emailData: EmailInfoDto, templateData: Record<string, string>) {
    try {
      const data = {
        ...emailData,
        from: this.from,
        html: changeEmailTemplate(emailData.to, templateData),
      };
      await this.sendEmail(data);

      return {
        message: 'Email sent',
        status: 200,
      };
    } catch (error) {
      throw boom.badImplementation('Fail sending email');
    }
  }
  async recoveryPassword(emailData: EmailInfoDto, templateData: Record<string, string>) {
    try {
      const data = {
        ...emailData,
        from: this.from,
        html: changePasswordTemplate(emailData.to, templateData),
      };
      await this.sendEmail(data);

      return {
        message: 'Email sent',
        status: 200,
      };
    } catch (error) {
      throw boom.badImplementation('Fail sending email');
    }
  }
}

export default SendEmailClass;
