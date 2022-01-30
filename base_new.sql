-- Table Definition
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    "id" serial NOT NULL,
    "name" varchar(100) NOT NULL,
  	"email" varchar(100) NOT NULL UNIQUE,
  	"password" text NOT NULL,
  	"created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);