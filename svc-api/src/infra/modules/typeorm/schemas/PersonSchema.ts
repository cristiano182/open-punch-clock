import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Company from './CompanySchema'
import Register from './RegisterSchema'

@Entity('person')
export default class PersonSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  document!: string

  @Column()
  phone!: string

  @Column()
  password!: string

  @Column()
  status!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => Company, (company) => company.persons, { nullable: false })
  company: Company

  @OneToMany(() => Register, (register) => register.person)
  registers: Register[]
}
