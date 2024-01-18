import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import FunctionalitySchema from './FunctionalitySchema'
import User from './UserSchema'

@Entity('functionalityuser')
export default class FunctionalityUserSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  create!: boolean

  @Column()
  read!: boolean

  @Column()
  update!: boolean

  @Column()
  delete!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToMany(() => User, (user) => user.functionalityUser, { nullable: false })
  user: User

  @ManyToMany(() => FunctionalitySchema, (functionality) => functionality.functionalityUser, { nullable: false })
  functionality: FunctionalitySchema
}
