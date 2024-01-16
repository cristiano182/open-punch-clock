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
import RegisterSchema from './RegisterSchema'
import Service from './ServiceSchema'

@Entity('job')
export default class JobSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  durationMinutes: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => Service, (service) => service.jobs, { nullable: false })
  service: Service

  @OneToMany(() => RegisterSchema, (register) => register.person)
  registers: RegisterSchema[]
}
