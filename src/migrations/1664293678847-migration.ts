import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1664293678847 implements MigrationInterface {
  name = 'migration1664293678847'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "parent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying NOT NULL, "homeAddress" character varying NOT NULL, "officeAddress" character varying NOT NULL, "occupation" character varying NOT NULL, "nationality" character varying NOT NULL, "stateOrigin" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_bf93c41ee1ae1649869ebd05617" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying, "middleName" character varying NOT NULL, "dob" character varying NOT NULL, "age" integer NOT NULL, "nationality" character varying NOT NULL, "stateOrigin" character varying NOT NULL, "address" character varying NOT NULL, "gender" character varying NOT NULL, "dateJoined" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL, "parentId" uuid, "classRoomId" uuid, "courseId" uuid, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "dob" character varying NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "gender" character varying NOT NULL, "dateJoined" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL, "courseId" uuid, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "class_room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "status" character varying NOT NULL, "remarks" character varying NOT NULL, "teacherId" uuid, "gradeId" uuid, CONSTRAINT "UQ_fce8b0eaf781daa84feec38af63" UNIQUE ("name"), CONSTRAINT "REL_b2f3c81c3e714a40f5577bb32b" UNIQUE ("teacherId"), CONSTRAINT "PK_81b8656a1cce35f9b01927ac9ba" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b" UNIQUE ("name"), CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "courseCode" character varying NOT NULL, "gradeId" uuid, CONSTRAINT "UQ_0ebbb44f3bf6503c64048a147f9" UNIQUE ("courseCode"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_d728e971c60c58a818dd9e614ab" FOREIGN KEY ("parentId") REFERENCES "parent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_64d39aeef17ddde289efccdcc5e" FOREIGN KEY ("classRoomId") REFERENCES "class_room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_a29d066e554ba135f0d9408c1b3" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD CONSTRAINT "FK_4665a054ff9af226fecb57f59b9" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "class_room" ADD CONSTRAINT "FK_b2f3c81c3e714a40f5577bb32b8" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "class_room" ADD CONSTRAINT "FK_92a05790c0ac40433b39cbeee17" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_9907378074b1d484169df5d5b5f" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query-result-cache"`)
    await queryRunner.query(
      `ALTER TABLE "course" DROP CONSTRAINT "FK_9907378074b1d484169df5d5b5f"`
    )
    await queryRunner.query(
      `ALTER TABLE "class_room" DROP CONSTRAINT "FK_92a05790c0ac40433b39cbeee17"`
    )
    await queryRunner.query(
      `ALTER TABLE "class_room" DROP CONSTRAINT "FK_b2f3c81c3e714a40f5577bb32b8"`
    )
    await queryRunner.query(
      `ALTER TABLE "teacher" DROP CONSTRAINT "FK_4665a054ff9af226fecb57f59b9"`
    )
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_a29d066e554ba135f0d9408c1b3"`
    )
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_64d39aeef17ddde289efccdcc5e"`
    )
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_d728e971c60c58a818dd9e614ab"`
    )
    await queryRunner.query(`DROP TABLE "course"`)
    await queryRunner.query(`DROP TABLE "grade"`)
    await queryRunner.query(`DROP TABLE "class_room"`)
    await queryRunner.query(`DROP TABLE "teacher"`)
    await queryRunner.query(`DROP TABLE "student"`)
    await queryRunner.query(`DROP TABLE "parent"`)
  }
}
