import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Company from './CompanySchema'
import FunctionalityUser from './FunctionalityUserSchema'

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

  @ManyToOne(() => Company, (company) => company.users)
  company: Company

  @OneToOne(() => FunctionalityUser, (functionalityUser) => functionalityUser.user, { nullable: false })
  functionalityUser: FunctionalityUser
}
