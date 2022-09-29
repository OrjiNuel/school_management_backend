import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Grade } from './Grade'
import { Student } from './Student'
import { Teacher } from './Teacher'

@Entity()
export class Course extends BaseModel {
  @Column()
  name: string

  @Column()
  description: string

  @Column({ unique: true })
  courseCode: string

  @ManyToOne(() => Grade, (grade) => grade.courses, {
    cascade: ['insert', 'update'],
  })
  grade: Grade

  @OneToMany(() => Student, (student) => student.course)
  students: Student[]

  @OneToMany(() => Teacher, (teacher) => teacher.course)
  teachers: Teacher[]
}
