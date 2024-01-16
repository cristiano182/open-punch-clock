import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { RegisterStatus } from '../../../../domain/register/enum/index'
import Job from './JobSchema'
import Person from './PersonSchema'
@Entity('register')
export default class RegisterSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  start!: Date

  @Column()
  end!: Date

  @Column()
  durationMinutes!: number

  @Column()
  registerDate!: Date

  @Column()
  status!: RegisterStatus

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => Person, (person) => person.registers, { nullable: false })
  person: Person

  @ManyToOne(() => Job, (job) => job.registers, { nullable: false })
  job: Job
}
