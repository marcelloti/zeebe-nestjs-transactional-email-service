import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { Logger } from 'winston';
import { AppService } from '../../services/app/app.service';
import { ZBClient } from 'zeebe-node';
import { CompleteFn, Job } from 'zeebe-node/interfaces';
import { ZEEBE_CONNECTION_PROVIDER, ZeebeWorker } from '@payk/nestjs-zeebe';

import { Ctx, Payload } from '@nestjs/microservices';

import { WINSTON_MODULE_PROVIDER } from '@payk/nestjs-winston';
import { SocketGateway } from '../../gateways/socket-gateway';
import { EmailJobData } from '../../classes/EmailJobData';
import { scheduleEmailPostData } from '../../classes/ScheduleEmailPostData';

@Controller()
export class AppController {
  constructor(
    private SocketIO: SocketGateway,
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(ZEEBE_CONNECTION_PROVIDER) private readonly zbClient: ZBClient,
  ) {
    this.zbClient.deployWorkflow('./src/bpmn/email.test.bpmn');
  }

  @Get('healthCheck')
  healthCheck(): string {
    return 'Up and running';
  }

  @Post('scheduleMail')
  async scheduleMail(@Body() { template }: scheduleEmailPostData) {
    let queueMails = await this.appService.makeMailQueue(template);

    let appControllerScopped = this;
    Object.entries(queueMails).map(function(data) {
      let mailJob = <EmailJobData>data[1];
      appControllerScopped.SocketIO.broadcast(
        'events',
        `Waiting mail send ${template} in workflow engine to ${mailJob.to}`,
      );
      switch (template) {
        case 'welcomeMail':
          appControllerScopped.welcomeMail();
          break;
        case 'marketingMail':
          appControllerScopped.marketingMail();
          break;
        default:
          console.log(`Template: ${template}`);
          appControllerScopped.nonExistMail();
          break;
      }
    });
  }

  marketingMail(): void {
    this.zbClient.createWorkflowInstance('email.sendWorkflow', {
      template: 'marketing',
      to: 'email@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });
  }

  welcomeMail(): void {
    this.zbClient.createWorkflowInstance('email.sendWorkflow', {
      template: 'welcome',
      to: 'email@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });
  }

  nonExistMail(): void {
    this.zbClient.createWorkflowInstance('email.sendWorkflow', {
      template: 'nonexist',
      to: 'email@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });
  }

  @ZeebeWorker('email:sendMail', {
    fetchVariable: ['to', 'firstName', 'lastName'],
  })
  async emailService(
    @Payload() job: Job<EmailJobData, Headers>,
    @Ctx() complete: CompleteFn<any>,
  ) {
    this.logger.info('Email Service');
    try {
      await this.appService.sendEmail(job.variables);
      this.SocketIO.broadcast('events', `Email ${job.variables.template} sent`);
    } catch (e) {
      this.logger.error(e.message ? e.message : e.Message);
      return complete.failure(e.message ? e.message : e.Message);
    }

    complete.success();
  }

  @ZeebeWorker('email:templateNotFound', { fetchVariable: ['template'] })
  async emailTemplateNotFound(
    @Payload() job: Job<Headers>,
    @Ctx() complete: CompleteFn<any>,
  ) {
    this.logger.info('Email Service');
    try {
      const errorMsg = `Template not found: "${job.variables['template']}"!`;
      this.SocketIO.broadcast('events', errorMsg);
    } catch (e) {
      this.logger.error(e.message ? e.message : e.Message);
      return complete.failure(e.message ? e.message : e.Message);
    }

    complete.success();
  }
}
