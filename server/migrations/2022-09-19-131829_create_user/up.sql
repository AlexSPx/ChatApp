CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT NOW(),
    "updated_at" DATE NOT NULL DEFAULT NOW(),

    PRIMARY KEY("id")
);

CREATE TABLE "server"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT NOW()
    "users" INTEGER NOT NULL,
    "channels" INTEGER NOT NULL,
    "settings" INTEGER NOT NULL,

    PRIMARY KEY("id")
);

CREATE TABLE "ServerJoin"(
    "user_id" INTEGER NOT NULL,
    "server_id" INTEGER NOT NULL,
    "joined_at" DATE NOT NULL,
    "settings" INTEGER NOT NULL,

    PRIMARY KEY("user_id", "server_id")
);

CREATE TABLE "ServerRoles"(
    "server_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    PRIMARY KEY("server_id", "name")
);

CREATE TABLE "channel"(
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "allowed_users" INTEGER NOT NULL,
    "allowed_roles" TEXT NOT NULL,
    
    PRIMARY KEY("id")
);

CREATE TABLE "ServerSettings"(
    "id" INTEGER NOT NULL,
    "roles" TEXT NOT NULL,
    
    PRIMARY KEY("id")
);

CREATE TABLE "UserServerSettings"(
    "id" INTEGER NOT NULL,
    "roles" TEXT NOT NULL,
    
    PRIMARY KEY("id")
);

ALTER TABLE
    "ServerJoin" ADD CONSTRAINT "serverjoin_server_id_foreign" FOREIGN KEY("server_id") REFERENCES "server"("id");
ALTER TABLE
    "server" ADD CONSTRAINT "server_settings_foreign" FOREIGN KEY("settings") REFERENCES "ServerSettings"("id");
ALTER TABLE
    "ServerJoin" ADD CONSTRAINT "serverjoin_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "ServerJoin" ADD CONSTRAINT "serverjoin_settings_foreign" FOREIGN KEY("settings") REFERENCES "UserServerSettings"("id");
ALTER TABLE
    "server" ADD CONSTRAINT "server_channels_foreign" FOREIGN KEY("channels") REFERENCES "channel"("id");