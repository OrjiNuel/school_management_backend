import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @CreateDateColumn({ type: 'timestamptz' })
  deletedAt: Date
}
