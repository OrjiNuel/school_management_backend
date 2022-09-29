import { E_CLASSROOM_STATUS } from './../types/ClassRoom'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { BaseModel } from './BaseModel'
import { Grade } from './Grade'
import { Student } from './Student'
import { Teacher } from './Teacher'

@Entity()
export class ClassRoom extends BaseModel {
  @Column({ unique: true })
  name: string

  @Column({ enum: E_CLASSROOM_STATUS })
  status: string

  @Column()
  remarks: string

  @OneToOne(() => Teacher, (teacher) => teacher.classRoom)
  @JoinColumn()
  teacher: Teacher

  @ManyToOne(() => Grade, (grade) => grade.classRooms, {
    cascade: ['insert', 'update'],
  })
  grade: Grade

  @OneToMany(() => Student, (student) => student.classRoom)
  students: Student[]
}
