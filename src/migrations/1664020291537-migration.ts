import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1664020291537 implements MigrationInterface {
    name = 'migration1664020291537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "courseCode" character varying NOT NULL, "gradeId" uuid, CONSTRAINT "UQ_0ebbb44f3bf6503c64048a147f9" UNIQUE ("courseCode"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b" UNIQUE ("name"), CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "status" boolean NOT NULL, "remarks" character varying NOT NULL, "teacherId" uuid, "gradeId" uuid, CONSTRAINT "UQ_fce8b0eaf781daa84feec38af63" UNIQUE ("name"), CONSTRAINT "REL_b2f3c81c3e714a40f5577bb32b" UNIQUE ("teacherId"), CONSTRAINT "PK_81b8656a1cce35f9b01927ac9ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD "classRoomId" uuid`);
        await queryRunner.query(`ALTER TABLE "student" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "gender" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "dateJoined" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_64d39aeef17ddde289efccdcc5e" FOREIGN KEY ("classRoomId") REFERENCES "class_room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_a29d066e554ba135f0d9408c1b3" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_4665a054ff9af226fecb57f59b9" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_9907378074b1d484169df5d5b5f" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_room" ADD CONSTRAINT "FK_b2f3c81c3e714a40f5577bb32b8" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_room" ADD CONSTRAINT "FK_92a05790c0ac40433b39cbeee17" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class_room" DROP CONSTRAINT "FK_92a05790c0ac40433b39cbeee17"`);
        await queryRunner.query(`ALTER TABLE "class_room" DROP CONSTRAINT "FK_b2f3c81c3e714a40f5577bb32b8"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_9907378074b1d484169df5d5b5f"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_4665a054ff9af226fecb57f59b9"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_a29d066e554ba135f0d9408c1b3"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_64d39aeef17ddde289efccdcc5e"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "dateJoined"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "classRoomId"`);
        await queryRunner.query(`DROP TABLE "class_room"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
