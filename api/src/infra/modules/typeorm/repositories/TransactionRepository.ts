import { inject, injectable } from 'inversify'
import { DataSource as Connection } from 'typeorm'
import { ITransactionRepo, ITransaction } from '../../../../domain/transaction/ITransactionRepo'
import TYPES from '../../../common/types/Types'


@injectable()
export default class TransactionRepository implements ITransactionRepo {
  constructor(@inject(TYPES.TypeORMConnection) private conn: Connection) {}

  async transaction({data}: ITransaction): Promise<void> {
    const queryRunner = this.conn.createQueryRunner()
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      for await (const {entity} of data) {
        const target = entity.constructor.name.toLocaleLowerCase()
        await queryRunner.manager.save(target, entity)
      }

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new Error('A transaction falhou!')
    } finally {
      await queryRunner.release()
    }
}
}
