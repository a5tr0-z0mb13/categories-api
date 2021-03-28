import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@WebSocketGateway({ namespace: 'categories' })
export class CategoriesGateway {
  constructor(private categoriesService: CategoriesService) {}

  @WebSocketServer()
  private namespace: Namespace;

  @SubscribeMessage('refresh')
  async onRefresh(socket: Socket, triggeredBy?: string): Promise<void> {
    const event: string = 'refreshed';
    const data: Category[] = await this.categoriesService.findAll();

    // Emit a 'refreshed' event to all Sockets
    this.namespace.emit(event, data);

    if (triggeredBy) {
      // Emit a 'message event to all *other* Sockets
      socket.broadcast.emit('message', `INFO: Categories updated by ${ triggeredBy }`);
    }

    // return { event, data };
  }
}
