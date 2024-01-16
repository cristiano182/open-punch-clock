import { DataSource } from 'typeorm'
import datasource from './config'

export default new DataSource(datasource)
