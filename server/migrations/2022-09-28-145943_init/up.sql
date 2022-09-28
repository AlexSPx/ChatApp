CREATE TABLE "user"(
    "id" serial,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATE DEFAULT Now(),
    "updated_at" DATE DEFAULT Now()
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "server"(
    "id" serial,
    "name" TEXT NOT NULL,
    "created_at" DATE DEFAULT Now(),
    "users" INTEGER NOT NULL,
    "channels" INTEGER NOT NULL,
    "settings" INTEGER NOT NULL
);
ALTER TABLE
    "server" ADD PRIMARY KEY("id");
CREATE TABLE "server_join"(
    "id" serial,
    "user_id" INTEGER NOT NULL,
    "server_id" INTEGER NOT NULL,
    "joined_at" DATE DEFAULT Now(),
    "settings" INTEGER NOT NULL
);
ALTER TABLE
    "server_join" ADD PRIMARY KEY("id");
CREATE TABLE "server_role"(
    "id" serial,
    "server_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL
);
ALTER TABLE
    "server_role" ADD PRIMARY KEY("id");
CREATE TABLE "channel"(
    "id" serial,
    "name" TEXT NOT NULL,
    "allowed_users" INTEGER NOT NULL,
    "allowed_roles" TEXT NOT NULL
);
ALTER TABLE
    "channel" ADD PRIMARY KEY("id");
CREATE TABLE "server_settings"(
    "id" serial,
    "roles" TEXT NOT NULL
);
ALTER TABLE
    "server_settings" ADD PRIMARY KEY("id");
CREATE TABLE "user_server_settings"(
    "id" serial,
    "roles" TEXT NOT NULL
);
ALTER TABLE
    "user_server_settings" ADD PRIMARY KEY("id");
ALTER TABLE
    "server_join" ADD CONSTRAINT "server_join_server_id_foreign" FOREIGN KEY("server_id") REFERENCES "server"("id");
ALTER TABLE
    "server" ADD CONSTRAINT "server_settings_foreign" FOREIGN KEY("settings") REFERENCES "server_settings"("id");
ALTER TABLE
    "server_join" ADD CONSTRAINT "server_join_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "server_join" ADD CONSTRAINT "server_join_settings_foreign" FOREIGN KEY("settings") REFERENCES "user_server_settings"("id");
ALTER TABLE
    "server" ADD CONSTRAINT "server_channels_foreign" FOREIGN KEY("channels") REFERENCES "channel"("id");