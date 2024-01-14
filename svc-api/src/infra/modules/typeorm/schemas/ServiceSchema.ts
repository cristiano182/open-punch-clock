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
import Job from './JobSchema'

@Entity('service')
export default class ServiceSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Job, (job) => job.service, { nullable: false })
  jobs: Job[]

  @ManyToOne(() => Aggrement, (aggrement) => aggrement.services, { nullable: false })
  aggrement: Aggrement
}
