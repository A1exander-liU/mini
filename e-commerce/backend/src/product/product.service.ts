import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async allProducts() {
    try {
      return await this.prisma.products.findMany();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
