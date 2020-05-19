import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';
require('dotenv').config();
const redisAddress = process.env.REDIS_ADDRESS;
const redisPort = parseInt(process.env.REDIS_PORT);

const redisAdapter = redisIoAdapter({ host: redisAddress, port: redisPort });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}