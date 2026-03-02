CREATE TABLE "users" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "username" varchar,
  "password" varchar,
  "role" varchar,
  "created_at" timestamp
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" varchar,
  "body" text,
  "user_id" integer NOT NULL,
  "status" varchar,
  "created_at" timestamp
);

ALTER TABLE "posts" ADD CONSTRAINT "user_posts" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE