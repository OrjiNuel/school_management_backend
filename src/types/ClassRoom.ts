import { ClassRoom } from './../entities/ClassRoom'
import { nativeEnum, object, string } from 'zod'
import { FieldError } from './FieldError'

export class ClassRoomResponse {
  errors?: FieldError[]
  classRooms?: ClassRoom[] | undefined | null
  count?: number
  classRoom?: ClassRoom | undefined | null
}

export enum E_CLASSROOM_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateClassRoomInput {
  gradeId: string
  name: string
  status: E_CLASSROOM_STATUS
  remarks: string
}

export class UpdateClassRoomInput {
  gradeId: string
  name: string
  status: E_CLASSROOM_STATUS
  remarks: string
}

export const createClassRoomSchema = object({
  body: object({
    gradeId: string({ required_error: 'Grade Id is required' }),
    name: string({ required_error: 'Class Room name is required' }),
    status: nativeEnum(E_CLASSROOM_STATUS, {
      required_error: 'Class Room status is required',
    }),
    remarks: string({ required_error: 'Class Room remarks is required' }),
  }),
})

export const updateClassRoomSchema = object({
  params: object({
    id: string({ required_error: 'Invalid grade is supplied' }),
  }),
  body: object({
    gradeId: string({ required_error: 'Grade Id is required' }),
    name: string({ required_error: 'Class Room name is required' }),
    status: nativeEnum(E_CLASSROOM_STATUS, {
      required_error: 'Class Room status is required',
    }),
    remarks: string({ required_error: 'Class Room remarks is required' }),
  }),
})
