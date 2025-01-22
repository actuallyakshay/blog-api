import { MigrationInterface, QueryRunner } from 'typeorm';

export class BITableCreations1737570028123 implements MigrationInterface {
   name = 'BITableCreations1737570028123';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "UQ_c88fd7cc2709de3a02cf10540c3" UNIQUE ("title", "user_id"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(`CREATE INDEX "IDX_c4f9a7bd77b489e711277ee598" ON "posts" ("user_id") `);
      await queryRunner.query(
         `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "google_id" character varying NOT NULL, "image_url" character varying, "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_eda599025f4476807824a255e41" UNIQUE ("email", "google_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
      );
      await queryRunner.query(
         `ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
      await queryRunner.query(`DROP TABLE "users"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_c4f9a7bd77b489e711277ee598"`);
      await queryRunner.query(`DROP TABLE "posts"`);
   }
}
