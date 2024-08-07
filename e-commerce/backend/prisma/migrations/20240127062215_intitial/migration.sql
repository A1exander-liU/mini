-- CreateEnum
CREATE TYPE "catch_advantage" AS ENUM ('turn', 'species', 'type', 'always', 'none');

-- CreateEnum
CREATE TYPE "collectible_rarity" AS ENUM ('common', 'rare', 'very rare', 'legendary');

-- CreateEnum
CREATE TYPE "held_item_activation" AS ENUM ('turn start', 'turn end', 'self hit', 'enemy hit', 'passive');

-- CreateEnum
CREATE TYPE "held_item_effect" AS ENUM ('stat', 'recovery', 'out of battle', 'turn');

-- CreateEnum
CREATE TYPE "held_item_target" AS ENUM ('self', 'enemy');

-- CreateEnum
CREATE TYPE "medicine_cures" AS ENUM ('paralysis', 'burn', 'sleep', 'frozen', 'none', 'all');

-- CreateEnum
CREATE TYPE "product_category" AS ENUM ('medicine', 'collectible', 'held item', 'ball');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balls" (
    "id" SERIAL NOT NULL,
    "catch_power" INTEGER DEFAULT 0,
    "boosted_catch_power" INTEGER DEFAULT 0,
    "advantage" "catch_advantage" DEFAULT 'none',

    CONSTRAINT "balls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collectibles" (
    "id" SERIAL NOT NULL,
    "rarity" "collectible_rarity" DEFAULT 'common',
    "tradeable" BOOLEAN DEFAULT false,

    CONSTRAINT "collectibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "held_items" (
    "id" SERIAL NOT NULL,
    "target" "held_item_target",
    "effect" "held_item_effect",
    "activation" "held_item_activation" DEFAULT 'passive',

    CONSTRAINT "held_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicines" (
    "id" SERIAL NOT NULL,
    "health_recovery" INTEGER DEFAULT 0,
    "pp_recovery" INTEGER DEFAULT 0,
    "cures" "medicine_cures" DEFAULT 'none',

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT,
    "imageurl" TEXT,
    "category" "product_category",
    "price" MONEY,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "orderid" SERIAL NOT NULL,
    "productid" SERIAL NOT NULL,
    "quantity" INTEGER DEFAULT 0,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "userid" SERIAL NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "country" TEXT NOT NULL,
    "postal_code" TEXT,
    "subtotal" MONEY DEFAULT 0.00,
    "tax" MONEY DEFAULT 0.00,
    "total" MONEY DEFAULT 0.00,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_carts" (
    "id" SERIAL NOT NULL,
    "userid" SERIAL NOT NULL,
    "productid" SERIAL NOT NULL,
    "quantity" INTEGER DEFAULT 0,

    CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_carts_userid_productid_key" ON "shopping_carts"("userid", "productid");

-- AddForeignKey
ALTER TABLE "balls" ADD CONSTRAINT "balls_id_fkey" FOREIGN KEY ("id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collectibles" ADD CONSTRAINT "collectibles_id_fkey" FOREIGN KEY ("id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "held_items" ADD CONSTRAINT "held_items_id_fkey" FOREIGN KEY ("id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_id_fkey" FOREIGN KEY ("id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productid_fkey" FOREIGN KEY ("productid") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_productid_fkey" FOREIGN KEY ("productid") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
