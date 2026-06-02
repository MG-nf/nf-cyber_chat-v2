import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1780397508483 implements MigrationInterface {
    name = 'InitialSchema1780397508483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "threadId" varchar NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" varchar NOT NULL, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_comments" ("id" varchar PRIMARY KEY NOT NULL, "threadId" varchar NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" varchar NOT NULL, "userId" varchar, CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_f682eb665c360168731f596b0e3" FOREIGN KEY ("threadId") REFERENCES "threads" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comments"("id", "threadId", "body", "createdAt", "authorId", "userId") SELECT "id", "threadId", "body", "createdAt", "authorId", "userId" FROM "comments"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "temporary_comments" RENAME TO "comments"`);
        await queryRunner.query(`CREATE TABLE "temporary_threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" varchar NOT NULL, CONSTRAINT "FK_7d2172aeb12db58bf620d14792d" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_threads"("id", "title", "body", "createdAt", "authorId") SELECT "id", "title", "body", "createdAt", "authorId" FROM "threads"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`ALTER TABLE "temporary_threads" RENAME TO "threads"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" RENAME TO "temporary_threads"`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "threads"("id", "title", "body", "createdAt", "authorId") SELECT "id", "title", "body", "createdAt", "authorId" FROM "temporary_threads"`);
        await queryRunner.query(`DROP TABLE "temporary_threads"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME TO "temporary_comments"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" varchar PRIMARY KEY NOT NULL, "threadId" varchar NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" varchar NOT NULL, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "comments"("id", "threadId", "body", "createdAt", "authorId", "userId") SELECT "id", "threadId", "body", "createdAt", "authorId", "userId" FROM "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "temporary_comments"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
