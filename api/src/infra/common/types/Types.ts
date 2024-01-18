const TYPES = {
  Container: Symbol.for('Container'),

  // USECASES
  CreateCompany: Symbol.for('CreateCompany'),
  ListCompany: Symbol.for('ListCompany'),
  CompanyStatus: Symbol.for('CompanyStatus'),
  UpdateCompany: Symbol.for('UpdateCompany'),

  Login: Symbol.for('Login'),

  CreateAggrement: Symbol.for('CreateAggrement'),
  ListAggrement: Symbol.for('ListAggrement'),

  CreateJob: Symbol.for('CreateJob'),
  ListJob: Symbol.for('ListJob'),

  CreatePerson: Symbol.for('CreatePerson'),
  ListPerson: Symbol.for('ListPerson'),

  CreateRegister: Symbol.for('CreateRegister'),
  ListRegister: Symbol.for('ListRegister'),

  CreateService: Symbol.for('CreateService'),
  ListService: Symbol.for('ListService'),

  CreateUser: Symbol.for('CreateUser'),
  ListUser: Symbol.for('ListUser'),

  CreateFunctionalityUser: Symbol.for('CreateFunctionalityUser'),
  ListFunctionalityUser: Symbol.for('ListFunctionalityUser'),

  CreateClient: Symbol.for('CreateClient'),
  ListClient: Symbol.for('ListClient'),

  //REPOSITORIES
  CompanyRepository: Symbol.for('CompanyRepository'),
  ClientRepository: Symbol.for('ClientRepository'),
  AggrementRepository: Symbol.for('AggrementRepository'),
  JobRepository: Symbol.for('JobRepository'),
  PersonRepository: Symbol.for('PersonRepository'),
  RegisterRepository: Symbol.for('RegisterRepository'),
  ServiceRepository: Symbol.for('ServiceRepository'),
  UserRepository: Symbol.for('UserRepository'),
  FunctionalityRepository: Symbol.for('FunctionalityRepository'),
  FunctionalityUserRepository: Symbol.for('FunctionalityUserRepository'),
  TransactionRepository: Symbol.for('TransactionRepository'),

  //RABBITMQ
  MessageChannel: Symbol.for('MessageChannel'),
  Producer: Symbol.for('Producer'),

  //CONTROLLERS
  CreateCompanyController: Symbol.for('CreateCompanyController'),
  ListCompanyController: Symbol.for('ListCompanyController'),
  UpdateCompanyController: Symbol.for('UpdateCompanyController'),

  ListClientController: Symbol.for('ListClientController'),
  CreateClientController: Symbol.for('CreateClientController'),

  CreateAggrementController: Symbol.for('CreateAggrementController'),
  ListAggrementController: Symbol.for('ListAggrementController'),

  CreateJobController: Symbol.for('CreateJobController'),
  ListJobController: Symbol.for('ListJobController'),

  CreatePersonController: Symbol.for('CreatePersonController'),
  ListPersonController: Symbol.for('ListPersonController'),

  CreateRegisterController: Symbol.for('CreateRegisterController'),
  ListRegisterController: Symbol.for('ListRegisterController'),

  CreateServiceController: Symbol.for('CreateServiceController'),
  ListServiceController: Symbol.for('ListServiceController'),

  CreateUserController: Symbol.for('CreateUserController'),
  ListUserController: Symbol.for('ListUserController'),

  CreateFunctionalityUserController: Symbol.for('CreateFunctionalityUserController'),
  ListFunctionalityUserController: Symbol.for('ListFunctionalityUserController'),

  //MODULES
  Authentication: Symbol.for('Authentication'),
  Fastify: Symbol.for('Fastify'),
  HttpModule: Symbol.for('HttpModule'),
  TypeORMConnection: Symbol.for('TypeORMConnection'),
}

export default TYPES
