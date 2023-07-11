-- CreateTable
CREATE TABLE "aws_account" (
    "accountId" VARCHAR(12) NOT NULL,
    "accountName" VARCHAR(128) NOT NULL,

    CONSTRAINT "aws_account_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "aws_record" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "accountId" TEXT NOT NULL,
    "serviceName" VARCHAR(128) NOT NULL,
    "rawRegion" VARCHAR(64) NOT NULL,
    "region" VARCHAR(64) NOT NULL,
    "rawSubServiceName" VARCHAR(128) NOT NULL,
    "subServiceName" VARCHAR(128) NOT NULL,
    "usage" DECIMAL NOT NULL,
    "unit" VARCHAR(64) NOT NULL,
    "rawDescription" VARCHAR(128) NOT NULL,
    "description" VARCHAR(128) NOT NULL,
    "pricePerUnit" DECIMAL NOT NULL,
    "prices" DECIMAL NOT NULL,
    "saves" DECIMAL NOT NULL,
    "nets" DECIMAL NOT NULL,

    CONSTRAINT "aws_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aws_account_accountId_key" ON "aws_account"("accountId");

-- CreateIndex
CREATE INDEX "aws_record_year_month_accountId_serviceName_idx" ON "aws_record"("year", "month", "accountId", "serviceName");

-- AddForeignKey
ALTER TABLE "aws_record" ADD CONSTRAINT "aws_record_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "aws_account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;
