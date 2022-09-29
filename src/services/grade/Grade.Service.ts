import {
  CreateGradeInput,
  GradeResponse,
  UpdateGradeInput,
} from '../../types/Grade'
import { PaginatedInputType } from '../../types/Context'
import { AppDataSource } from '../../constants/data-source'
import { Grade } from '../../entities/Grade'
import { Equal } from 'typeorm'

// Get all grades
export async function getAllGradesService(
  paginatedInput: PaginatedInputType
): Promise<GradeResponse> {
  const grades = await AppDataSource.getRepository(Grade)
    .createQueryBuilder('grade')
    .skip(paginatedInput.skip)
    .take(paginatedInput.take)
    .cache(true)
    .where('grade.name ILIKE :query', {
      query: `%${paginatedInput.query ?? ''}%`,
    })
    .getManyAndCount()
  return {
    grades: grades[0],
    count: grades[1],
  }
}

// Get single grade by id
export async function getGradeService(id: string): Promise<GradeResponse> {
  const grade = await AppDataSource.getRepository(Grade).findOne({
    where: { id: Equal(id) },
    cache: true,
  })
  return { grade }
}

// Create grade
export async function createGradeService(
  createGradeDTO: CreateGradeInput
): Promise<GradeResponse> {
  const grade = await AppDataSource.createQueryBuilder()
    .insert()
    .into(Grade)
    .values({ ...createGradeDTO })
    .returning('*')
    .execute()
  return { grade: grade.raw[0] }
}

// Update a grade
export async function updateGradeService(
  id: string,
  updateGradeDTO: UpdateGradeInput
): Promise<GradeResponse> {
  const grade = await AppDataSource.createQueryBuilder()
    .update(Grade)
    .set({
      updatedAt: new Date(),
      ...updateGradeDTO,
    })
    .where('id = :id', { id })
    .returning('*')
    .execute()
  return { grade: grade.raw[0] }
}

// Delete a batch
export async function deleteGradeService(id: string): Promise<GradeResponse> {
  const grade = await AppDataSource.createQueryBuilder()
    .softDelete()
    .from(Grade)
    .where('id = :id', { id })
    .returning('*')
    .execute()
  return { grade: grade.raw[0] }
}
