import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { ClassRoom } from './ClassRoom'
import { Course } from './Course'
import { Parent } from './Parent'

@Entity()
export class Student extends BaseModel {
  @Column()
  email: string

  @Column()
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  phone: string

  @Column()
  middleName: string

  @Column()
  dob: string

  @Column()
  age: number

  @Column()
  nationality: string

  @Column()
  stateOrigin: string

  @Column()
  address: string

  @Column()
  gender: string

  @Column({ type: 'timestamptz' })
  dateJoined: Date

  @Column()
  status: string

  @ManyToOne(() => Parent, (parent) => parent.students, {
    cascade: ['insert', 'update'],
  })
  parent: Parent

  @ManyToOne(() => ClassRoom, (classRoom) => classRoom.students, {
    cascade: ['insert', 'update'],
  })
  classRoom: ClassRoom

  @ManyToOne(() => Course, (course) => course.students, {
    cascade: ['insert', 'update'],
  })
  course: Course
}
