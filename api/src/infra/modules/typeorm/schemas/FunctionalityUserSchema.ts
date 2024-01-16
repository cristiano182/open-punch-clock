import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import FunctionalitySchema from './FunctionalitySchema'
import User from './UserSchema'

@Entity('functionalityUser')
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

  @OneToOne(() => User, (user) => user.functionalityUser, { nullable: false })
  user: User

  @OneToOne(() => FunctionalitySchema, (functionality) => functionality.functionalityUser, { nullable: false })
  functionality: FunctionalitySchema
}
