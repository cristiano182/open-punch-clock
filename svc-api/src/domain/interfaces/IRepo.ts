export interface IRepo<T> {
  create(entity: T): Promise<T>
  update(id: string, entity: Partial<T>): Promise<void | T>
  deleteById(id: string): Promise<void>
  find(params: Partial<T>): Promise<T | null>
}
