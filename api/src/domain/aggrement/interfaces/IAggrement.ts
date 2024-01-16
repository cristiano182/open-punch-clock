import { IClient } from '@domain/client'

export interface IAggrement {
  id: string
  name: string
  client: IClient
}
