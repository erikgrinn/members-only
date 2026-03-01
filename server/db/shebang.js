#! /usr/bin/env node

// node will ignore shebang line if manually running
// (so not in terminal)
// remember it needs to be very first line
require("dotenv").config();

const { Client } = require("pg");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const SQL = `CREATE TABLE "users" (
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

ALTER TABLE "posts" ADD CONSTRAINT "user_posts" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
`;

async function seed() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/members_only`,
  });
  await client.connect();
  const result = await client.query(SQL);
  console.log(result.rows); // undefined for all but SELECT
  await client.end();
  console.log("done");
}

seed();
