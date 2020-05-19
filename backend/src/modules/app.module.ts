import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app/app.controller';
import { ZeebeModule, ZeebeServer } from '@payk/nestjs-zeebe';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppService } from '../services/app/app.service';
import { EventsModule } from '../events/events.module';
import { SocketGateway } from '../gateways/socket-gateway';
@Module({
  imports: [
    EventsModule,
    ZeebeModule.forRoot({
      options: {
        longPoll: 3000,
      },
      // Uncomment this line to use an specific address for zeebe server.
      // Otherwise, will be localhost:26500
      // gatewayAddress: '172.21.0.2:26500',
    }),

    WinstonModule.forRoot({
      transports: [new winston.transports.Console()],
    }),

    AppService,
  ],
  controllers: [AppController],
  providers: [ZeebeServer, AppService, SocketGateway],
})
export class AppModule {}
