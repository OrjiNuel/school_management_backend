import { MigrationInterface, QueryRunner } from 'typeorm'

export class migration1664323498322 implements MigrationInterface {
  name = 'migration1664323498322'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "parent" ALTER COLUMN "updatedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "parent" ALTER COLUMN "deletedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "updatedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "deletedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "updatedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "deletedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "updatedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "deletedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "grade" ALTER COLUMN "updatedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "grade" ALTER COLUMN "deletedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "class_room" ALTER COLUMN "updatedAt" DROP NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "class_room" ALTER COLUMN "deletedAt" DROP NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "class_room" ALTER COLUMN "deletedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "class_room" ALTER COLUMN "updatedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "grade" ALTER COLUMN "deletedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "grade" ALTER COLUMN "updatedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "deletedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "updatedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "deletedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "updatedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "deletedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "updatedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "parent" ALTER COLUMN "deletedAt" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "parent" ALTER COLUMN "updatedAt" SET NOT NULL`
    )
  }
}
