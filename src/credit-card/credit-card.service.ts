import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { CreditCard } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CreditCardService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATION_SERVICE') private readonly rabbitClient: ClientProxy
  ) { }

  async create(
    data: Prisma.CreditCardCreateInput
  ) {
    const creditCard = await this.prisma.creditCard.create({ data });

    this.sendRegistrationPaymentNotification(JSON.stringify(creditCard));

    this.processPayment(creditCard);

    return creditCard;
  }

  async processPayment(payment: CreditCard) {
    //simulate payment processing
    setTimeout(() => {
      this.sendConfirmationPaymentNotification(JSON.stringify(payment));
    }, 4000);

  }

  sendRegistrationPaymentNotification(message: String) { 
    try {
      this.rabbitClient.emit('register', {
        id: randomUUID(),
        data: {notification: message},
      });
    } catch (error) { 
      console.log('Error sending message to RabbitMQ:', error);
    }
  }

  sendConfirmationPaymentNotification(message: String) { 
    try {
      this.rabbitClient.emit('confirmation', {
        id: randomUUID(),
        data: { notification: message },
      });
    } catch (error) {
      console.log('Error sending message to RabbitMQ:', error);
    }
  }
}
