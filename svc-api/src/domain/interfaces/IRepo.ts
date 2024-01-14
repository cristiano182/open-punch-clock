export interface IRepo<T> {
  create(entity: T): Promise<T>
  update(id: string, entity: Partial<T>): Promise<T>
  deleteById(id: string): Promise<void>
  findById(id: string): Promise<T | null>
}
