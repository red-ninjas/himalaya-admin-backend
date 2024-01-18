import { MigrationInterface, QueryRunner } from 'typeorm';

export class System1705059848171 implements MigrationInterface {
  name = 'System1705059848171';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schema_auth_clients" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "client_id" text NOT NULL, "client_secret" text, "grants" text NOT NULL DEFAULT ('client_credentials,refresh_token'), "scope" varchar(500) NOT NULL, "access_token_lifetime" integer NOT NULL DEFAULT (3600), "refresh_token_lifetime" integer NOT NULL DEFAULT (7200), "private_key" text NOT NULL, "public_key" text NOT NULL, "cert" text NOT NULL, "cert_expires_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (now()), "deleted_at" datetime, CONSTRAINT "UQ_45bc4feb7bc791056dccef8823d" UNIQUE ("client_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_auth_permission_groups" ("slug" varchar(120) PRIMARY KEY NOT NULL, "displayTitle" varchar(120) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_auth_roles" ("slug" varchar(120) PRIMARY KEY NOT NULL, "displayTitle" varchar(120) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_auth_permissions" ("slug" varchar(120) PRIMARY KEY NOT NULL, "displayTitle" varchar(120) NOT NULL, "groupSlug" varchar(120))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_auth_client_roles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "identifier" varchar NOT NULL, "roleSlug" varchar(120), CONSTRAINT "UQ_d8ed48b2353e2dc8693c867afa2" UNIQUE ("roleSlug", "identifier"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_access_tokens" ("id" varchar NOT NULL, "access_token" varchar(80) NOT NULL, "refresh_token" varchar(80) NOT NULL, "access_token_expires_at" datetime NOT NULL, "refresh_token_expires_at" datetime NOT NULL, "user_id" varchar, "scope" varchar(500), "created_on" datetime NOT NULL DEFAULT (now()), "created_from" json, "client_id" varchar NOT NULL, CONSTRAINT "UQ_c2315c06123b7886476f14499fb" UNIQUE ("refresh_token"), PRIMARY KEY ("id", "access_token"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_schema_auth_permissions" ("slug" varchar(120) PRIMARY KEY NOT NULL, "displayTitle" varchar(120) NOT NULL, "groupSlug" varchar(120), CONSTRAINT "FK_a1ab8619e6e68943beb98d7e887" FOREIGN KEY ("groupSlug") REFERENCES "schema_auth_permission_groups" ("slug") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_schema_auth_permissions"("slug", "displayTitle", "groupSlug") SELECT "slug", "displayTitle", "groupSlug" FROM "schema_auth_permissions"`,
    );
    await queryRunner.query(`DROP TABLE "schema_auth_permissions"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_schema_auth_permissions" RENAME TO "schema_auth_permissions"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_schema_auth_client_roles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "identifier" varchar NOT NULL, "roleSlug" varchar(120), CONSTRAINT "UQ_d8ed48b2353e2dc8693c867afa2" UNIQUE ("roleSlug", "identifier"), CONSTRAINT "FK_9119b10057145abf25ea35f5bcf" FOREIGN KEY ("roleSlug") REFERENCES "schema_auth_roles" ("slug") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_schema_auth_client_roles"("id", "identifier", "roleSlug") SELECT "id", "identifier", "roleSlug" FROM "schema_auth_client_roles"`,
    );
    await queryRunner.query(`DROP TABLE "schema_auth_client_roles"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_schema_auth_client_roles" RENAME TO "schema_auth_client_roles"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_schema_access_tokens" ("id" varchar NOT NULL, "access_token" varchar(80) NOT NULL, "refresh_token" varchar(80) NOT NULL, "access_token_expires_at" datetime NOT NULL, "refresh_token_expires_at" datetime NOT NULL, "user_id" varchar, "scope" varchar(500), "created_on" datetime NOT NULL DEFAULT (now()), "created_from" json, "client_id" varchar NOT NULL, CONSTRAINT "UQ_c2315c06123b7886476f14499fb" UNIQUE ("refresh_token"), CONSTRAINT "FK_cf45404b988e029dc71b416dd1f" FOREIGN KEY ("client_id") REFERENCES "schema_auth_clients" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("id", "access_token"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_schema_access_tokens"("id", "access_token", "refresh_token", "access_token_expires_at", "refresh_token_expires_at", "user_id", "scope", "created_on", "created_from", "client_id") SELECT "id", "access_token", "refresh_token", "access_token_expires_at", "refresh_token_expires_at", "user_id", "scope", "created_on", "created_from", "client_id" FROM "schema_access_tokens"`,
    );
    await queryRunner.query(`DROP TABLE "schema_access_tokens"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_schema_access_tokens" RENAME TO "schema_access_tokens"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schema_access_tokens" RENAME TO "temporary_schema_access_tokens"`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_access_tokens" ("id" varchar NOT NULL, "access_token" varchar(80) NOT NULL, "refresh_token" varchar(80) NOT NULL, "access_token_expires_at" datetime NOT NULL, "refresh_token_expires_at" datetime NOT NULL, "user_id" varchar, "scope" varchar(500), "created_on" datetime NOT NULL DEFAULT (now()), "created_from" json, "client_id" varchar NOT NULL, CONSTRAINT "UQ_c2315c06123b7886476f14499fb" UNIQUE ("refresh_token"), PRIMARY KEY ("id", "access_token"))`,
    );
    await queryRunner.query(
      `INSERT INTO "schema_access_tokens"("id", "access_token", "refresh_token", "access_token_expires_at", "refresh_token_expires_at", "user_id", "scope", "created_on", "created_from", "client_id") SELECT "id", "access_token", "refresh_token", "access_token_expires_at", "refresh_token_expires_at", "user_id", "scope", "created_on", "created_from", "client_id" FROM "temporary_schema_access_tokens"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_schema_access_tokens"`);
    await queryRunner.query(
      `ALTER TABLE "schema_auth_client_roles" RENAME TO "temporary_schema_auth_client_roles"`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_auth_client_roles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "identifier" varchar NOT NULL, "roleSlug" varchar(120), CONSTRAINT "UQ_d8ed48b2353e2dc8693c867afa2" UNIQUE ("roleSlug", "identifier"))`,
    );
    await queryRunner.query(
      `INSERT INTO "schema_auth_client_roles"("id", "identifier", "roleSlug") SELECT "id", "identifier", "roleSlug" FROM "temporary_schema_auth_client_roles"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_schema_auth_client_roles"`);
    await queryRunner.query(
      `ALTER TABLE "schema_auth_permissions" RENAME TO "temporary_schema_auth_permissions"`,
    );
    await queryRunner.query(
      `CREATE TABLE "schema_auth_permissions" ("slug" varchar(120) PRIMARY KEY NOT NULL, "displayTitle" varchar(120) NOT NULL, "groupSlug" varchar(120))`,
    );
    await queryRunner.query(
      `INSERT INTO "schema_auth_permissions"("slug", "displayTitle", "groupSlug") SELECT "slug", "displayTitle", "groupSlug" FROM "temporary_schema_auth_permissions"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_schema_auth_permissions"`);
    await queryRunner.query(`DROP TABLE "schema_access_tokens"`);
    await queryRunner.query(`DROP TABLE "schema_auth_client_roles"`);
    await queryRunner.query(`DROP TABLE "schema_auth_permissions"`);
    await queryRunner.query(`DROP TABLE "schema_auth_roles"`);
    await queryRunner.query(`DROP TABLE "schema_auth_permission_groups"`);
    await queryRunner.query(`DROP TABLE "schema_auth_clients"`);
  }
}
