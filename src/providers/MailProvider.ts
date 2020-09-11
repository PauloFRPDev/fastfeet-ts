import nodemailer, { Transporter } from 'nodemailer';

import MailTemplateProvider, {
  TemplateVariables,
} from './HandlebarsMailTemplateProvider';

import mailConfig from '../config/mail';

interface MailContact {
  name: string;
  email: string;
}

interface SendMailDTO {
  to: string;
  from?: MailContact;
  subject: string;
  templateData: {
    file: string;
    variables: TemplateVariables;
  };
}

export default class MailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider = new MailTemplateProvider()) {
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: false,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass,
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe FastFeet',
        address: from?.email || 'admin@fastfeet.com',
      },
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
