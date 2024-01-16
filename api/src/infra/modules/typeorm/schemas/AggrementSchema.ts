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
import Client from './ClientSchema'
import Service from './ServiceSchema'

@Entity('aggrement')
export default class AggrementSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => Client, (client) => client.aggrements, { nullable: false })
  client: Client

  @OneToMany(() => Service, (service) => service.aggrement, { nullable: false })
  services: Service[]
}
