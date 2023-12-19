


export interface IUseCaseValidator <IEntity, IParams> {
    execute: (params: IParams) => IEntity;
}
