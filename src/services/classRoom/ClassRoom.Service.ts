import { PaginatedInputType } from '../../types/Context'
import { AppDataSource } from '../../constants/data-source'
import { Equal } from 'typeorm'
import {
  ClassRoomResponse,
  CreateClassRoomInput,
  UpdateClassRoomInput,
} from '../../types/ClassRoom'
import { ClassRoom } from '../../entities/ClassRoom'
import { Grade } from '../../entities/Grade'

// Get all class rooms
export async function getAllClassRoomsService(
  paginatedInput: PaginatedInputType
): Promise<ClassRoomResponse> {
  const classRooms = await AppDataSource.getRepository(ClassRoom)
    .createQueryBuilder('classRoom')
    .skip(paginatedInput.skip)
    .take(paginatedInput.take)
    .leftJoinAndSelect('classRoom.grade', 'grade')
    .cache(true)
    .where('classRoom.name ILIKE :query', {
      query: `%${paginatedInput.query ?? ''}%`,
    })
    .getManyAndCount()
  return {
    classRooms: classRooms[0],
    count: classRooms[1],
  }
}

// Get all classrooms for a grade
export async function getAllClassRoomsServiceForGrade(
  id: string,
  paginatedInput: PaginatedInputType
): Promise<ClassRoomResponse> {
  const classRooms = await AppDataSource.getRepository(ClassRoom)
    .createQueryBuilder('classRoom')
    .skip(paginatedInput.skip)
    .take(paginatedInput.take)
    .leftJoinAndSelect('classRoom.grade', 'grade')
    .where('classRoom.gradeId = :id', { id })
    .andWhere('classRoom.name ILIKE :query', {
      query: `%${paginatedInput.query ?? ''}%`,
    })
    .cache(true)
    .getManyAndCount()
  return {
    classRooms: classRooms[0],
    count: classRooms[1],
  }
}

// Get single class room by id
export async function getClassRoomService(
  id: string
): Promise<ClassRoomResponse> {
  const classRoom = await AppDataSource.getRepository(ClassRoom).findOne({
    where: { id: Equal(id) },
    cache: true,
  })
  return { classRoom }
}

// Create class room
export async function createClassRoomService(
  createClassRoomDTO: CreateClassRoomInput
): Promise<ClassRoomResponse> {
  const grade = await Grade.findOneBy({
    id: Equal(createClassRoomDTO.gradeId),
  })
  if (!grade) throw new Error('Grade not found')
  const classRoom = await AppDataSource.createQueryBuilder()
    .insert()
    .into(ClassRoom)
    .values({ ...createClassRoomDTO, grade })
    .returning('*')
    .execute()
  return { classRoom: classRoom.raw[0] }
}

// Update a class room
export async function updateClassRoomService(
  id: string,
  updateClassRoomDTO: UpdateClassRoomInput
): Promise<ClassRoomResponse> {
  const classRoom = await AppDataSource.createQueryBuilder()
    .update(ClassRoom)
    .set({
      updatedAt: new Date(),
      ...updateClassRoomDTO,
    })
    .where('id = :id', { id })
    .returning('*')
    .execute()
  return { classRoom: classRoom.raw[0] }
}

// Delete a class room
export async function deleteClassRoomService(
  id: string
): Promise<ClassRoomResponse> {
  const classRoom = await AppDataSource.createQueryBuilder()
    .softDelete()
    .from(ClassRoom)
    .where('id = :id', { id })
    .returning('*')
    .execute()
  return { classRoom: classRoom.raw[0] }
}
