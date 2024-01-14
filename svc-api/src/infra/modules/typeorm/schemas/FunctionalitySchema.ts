import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import FunctionalityUserSchema from './FunctionalityUserSchema'

@Entity('functionality')
export default class FunctionalitySchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToOne(() => FunctionalityUserSchema, (functionalityUserSchema) => functionalityUserSchema.functionality, {
    nullable: false,
  })
  functionalityUser: FunctionalityUserSchema
}
