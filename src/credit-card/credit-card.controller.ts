import { Body, Controller, Post } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { Prisma, CreditCard } from 'generated/prisma';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('send')
  async send(@Body() data: Prisma.CreditCardCreateInput): 
      Promise <CreditCard> {
      return await this.creditCardService.create(data);
    }
  }

