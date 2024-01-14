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
import Aggrement from './AggrementSchema'
import Company from './CompanySchema'

@Entity('client')
export default class ClientSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => Company, (company) => company.clients, { nullable: false })
  company: Company

  @OneToMany(() => Aggrement, (aggrement) => aggrement.client, { nullable: false })
  aggrements: Aggrement[]
}
