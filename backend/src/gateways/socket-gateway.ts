import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');

  wsClients=[];
  afterInit() {
    console.log('Gateway initialized');
    this.logger.log('Init');
  }

  handleConnection(client: any) {
    console.log('client connected');
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    console.log('client disconnected');
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i].id === client.id) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect',{});
  }

  public broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (let c of this.wsClients) {
      c.emit(event, broadCastMessage);
    }
  }

  @SubscribeMessage('msgToServer')
  onChgEvent(client: any, payload: any) {
    this.broadcast('events',payload);
  }
}