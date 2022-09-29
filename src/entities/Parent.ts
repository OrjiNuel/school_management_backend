import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Student } from './Student'

@Entity()
export class Parent extends BaseModel {
  @Column()
  email: string

  @Column()
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  phone: string

  @Column()
  homeAddress: string

  @Column()
  officeAddress: string

  @Column()
  occupation: string

  @Column()
  nationality: string

  @Column()
  stateOrigin: string

  @Column()
  status: string

  @OneToMany(() => Student, (student) => student.parent)
  students: Student[]
}
