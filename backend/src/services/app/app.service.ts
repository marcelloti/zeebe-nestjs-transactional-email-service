import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';
import { EmailJobData } from '../../classes/EmailJobData';
import { EmailJobArray } from '../../classes/EmailJobArray';
import { scheduleEmailPostData } from '../../classes/ScheduleEmailPostData';
import ses = require('node-ses');
import { WINSTON_MODULE_PROVIDER } from '@payk/nestjs-winston';
import * as EmailValidator from 'email-validator';
import Mailgen = require('mailgen');
import { templates } from '../../templates';
const { render } = require('micromustache');
require('dotenv').config();

const key = process.env.ZEEBE_TXES_AWS_SES_KEY;
const secret = process.env.ZEEBE_TXES_AWS_SES_SECRET;
const defaultProductName = process.env.ZEEBE_TXES_PRODUCT_NAME;
const senderAddress = process.env.ZEEBE_SES_DEFAULT_SENDER_ADDRESS;
const defaultProductLink = process.env.ZEEBE_TXES_PRODUCT_LINK || '#blank';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: defaultProductName,
    link: defaultProductLink,
    // Logo opcional do produto
    // logo: 'https://api.adorable.io/avatars/64/abott@adorable.png'
  },
});

@Injectable()
export class AppService {
  client: ses.Client;
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    if (!key || !secret) {
      this.logger.error('Missing required AWS SES credential(s)');
    }
    this.client = ses.createClient({ key, secret });
  }

  async makeMailQueue(template: string) {
    // Create a list of recipients
    // In a real scenario, this list can be created e.g. with some logic
    // in the backend layer.
    let queueMails = new EmailJobArray();

    let mailJob = new EmailJobData();
    mailJob.firstName = 'John';
    mailJob.lastName = 'Doe';
    mailJob.template = template;
    mailJob.to = 'test@test.com';
    queueMails[0] = mailJob;

    let mailJob2 = new EmailJobData();
    mailJob2.firstName = 'John';
    mailJob2.lastName = 'Doe';
    mailJob2.template = template;
    mailJob2.to = 'test2@test.com';
    queueMails[1] = mailJob2;

    return queueMails;
  }

  async sendEmail(data: EmailJobData) {
    const { template, to, firstName, lastName } = data;

    if (!EmailValidator.validate(to)) {
      throw new Error(`Email address ${to} does not validate`);
    }

    const templateData = templates[template];

    if (!template) {
      throw new Error(`Template file ${template} not found!`);
    }

    const emailBody = mailGenerator.generate(templateData);
    const emailText = mailGenerator.generatePlaintext(templateData);

    const htmlEmail = render(emailBody, {
      email: to,
      firstName: '',
      lastName: lastName || '',
      product: defaultProductName,
      baseUrl: defaultProductLink,
    });

    const textEmail = render(emailText, {
      email: to,
      firstName: '',
      lastName: lastName || '',
      product: defaultProductName,
      baseUrl: defaultProductLink,
    });

    const emailSender = process.env.EMAIL_SENDER;

    if (emailSender === 'AWS') {
      await new Promise((resolve, reject) =>
        this.client.sendEmail(
          {
            to: to,
            from: senderAddress,
            subject: templateData.subject,
            message: htmlEmail,
            altText: textEmail,
          },
          (err, _, __) => {
            if (err) {
              return reject(err);
            }
            this.logger.info(`Email sent to ${to}`);
            resolve();
          },
        ),
      );
    } else {
      this.logger.info(`Fake email sent to ${to}`);
    }
    return true;
  }
}
