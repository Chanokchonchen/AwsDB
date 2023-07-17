-- CreateTable
CREATE TABLE "aws_account" (
    "account_id" VARCHAR(12) NOT NULL,
    "account_name" VARCHAR(128) NOT NULL,

    CONSTRAINT "aws_account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "aws_record" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "account_id" TEXT NOT NULL,
    "service_name" VARCHAR(128) NOT NULL,
    "raw_region" VARCHAR(64) NOT NULL,
    "region" VARCHAR(64) NOT NULL,
    "raw_sub_service_name" VARCHAR(128) NOT NULL,
    "sub_service_name" VARCHAR(128) NOT NULL,
    "usage" DECIMAL(16,3) NOT NULL,
    "unit" VARCHAR(64) NOT NULL,
    "raw_description" VARCHAR(128) NOT NULL,
    "description" VARCHAR(128) NOT NULL,
    "price_per_unit" DECIMAL(16,5) NOT NULL,
    "prices" DECIMAL(16,2) NOT NULL,
    "saves" DECIMAL(16,2) NOT NULL,
    "nets" DECIMAL(16,2) NOT NULL,

    CONSTRAINT "aws_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aws_account_account_id_key" ON "aws_account"("account_id");

-- CreateIndex
CREATE INDEX "aws_record_year_month_account_id_service_name_idx" ON "aws_record"("year", "month", "account_id", "service_name");

-- AddForeignKey
ALTER TABLE "aws_record" ADD CONSTRAINT "aws_record_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "aws_account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
