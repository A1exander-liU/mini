import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { product_category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async allProducts(category?: product_category) {
    try {
      return await this.prisma.products.findMany({ where: { category } });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async oneProduct(productId: number) {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new BadRequestException(`Product with id: ${productId} not found`);
    }

    switch (product.category) {
      case 'ball': {
        const pokeball = await this.prisma.balls.findUnique({
          where: { id: product.id },
          select: {
            id: false,
            catch_power: true,
            boosted_catch_power: true,
            advantage: true,
          },
        });
        return { ...product, details: pokeball };
      }
      case 'collectible': {
        const collectible = await this.prisma.collectibles.findUnique({
          where: { id: product.id },
          select: { id: false, rarity: true, tradeable: true },
        });
        return { ...product, details: collectible };
      }
      case 'held_item': {
        const heldItem = await this.prisma.held_items.findUnique({
          where: { id: product.id },
          select: { id: false, target: true, effect: true, activation: true },
        });
        return { ...product, details: heldItem };
      }
      case 'medicine': {
        const medicine = await this.prisma.medicines.findUnique({
          where: { id: product.id },
          select: {
            id: false,
            health_recovery: true,
            pp_recovery: true,
            cures: true,
          },
        });
        return { ...product, details: medicine };
      }
    }
  }
}
