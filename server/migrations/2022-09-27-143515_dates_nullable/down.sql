ALTER TABLE "user" ALTER COLUMN "created_at" DATE NOT NULL DEFAULT Now();
ALTER TABLE "user" ALTER COLUMN "updated_at" DATE NOT NULL DEFAULT Now();