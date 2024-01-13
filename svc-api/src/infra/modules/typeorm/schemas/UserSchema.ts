import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export default class UserSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  status!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
