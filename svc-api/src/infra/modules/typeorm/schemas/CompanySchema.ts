import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Client from './ClientSchema'
import PersonSchema from './PersonSchema'
import User from './UserSchema'

@Entity('company')
export default class CompanySchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  document: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Client, (client) => client.company, { nullable: false })
  clients: Client[]

  @OneToMany(() => User, (user) => user.company, { nullable: false })
  users: User[]

  @OneToMany(() => PersonSchema, (user) => user.company, { nullable: false })
  persons: PersonSchema[]
}
