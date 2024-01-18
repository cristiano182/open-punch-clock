interface IEntity {
  entity: Record<any, any>
}

export interface ITransaction {
  data: IEntity[]
}

export interface ITransactionRepo {
  transaction(data: ITransaction): Promise<void>
}
