const TYPES = {
  Container: Symbol.for('Container'),

  // USECASES
  CreateCompany: Symbol.for('CreateCompany'),
  ListCompany: Symbol.for('ListCompany'),
  CompanyStatus: Symbol.for('CompanyStatus'),

  CreateClient: Symbol.for('CreateClient'),
  ListClient: Symbol.for('ListClient'),

  //REPOSITORIES
  CompanyRepository: Symbol.for('CompanyRepository'),
  ClientRepository: Symbol.for('ClientRepository'),

  //RABBITMQ
  MessageChannel: Symbol.for('MessageChannel'),
  Producer: Symbol.for('Producer'),

  //CONTROLLERS
  CreateCompanyController: Symbol.for('CreateCompanyController'),
  ListCompanyController: Symbol.for('ListCompanyController'),

  ListClientController: Symbol.for('ListClientController'),
  CreateClientController: Symbol.for('CreateClientController'),

  //MODULES
  Authentication: Symbol.for('Authentication'),
  Fastify: Symbol.for('Fastify'),
  HttpModule: Symbol.for('HttpModule'),
  TypeORMConnection: Symbol.for('TypeORMConnection'),
}

export default TYPES
