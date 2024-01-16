/* eslint-disable */

import env from 'env-var'
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy

const datasource: any = {
  type: env.get('TYPEORM_CONNECTION').default('postgres').asString(),
  host: env.get('TYPEORM_HOST').default('localhost').asString(),
  port: env.get('TYPEORM_PORT').default(5432).asInt(),
  username: env.get('TYPEORM_USERNAME').default('dbuser').asString(),
  password: env.get('TYPEORM_PASSWORD').default('dbpass').asString(),
  database: env.get('TYPEORM_DATABASE').default('budget').asString(),
  synchronize: env.get('TYPEORM_SYNCHRONIZE').default('true').asBool(),
  logging: env.get('TYPEORM_LOGGING').default('false').asBool(),
  entities: env.get('TYPEORM_ENTITIES').default('./src/infra/modules/typeorm/schemas/*.ts').asArray(),
  migrations: env.get('TYPEORM_MIGRATIONS').default('./src/infra/modules/typeorm/migrations/*.ts').asArray(),
  cli: {
    migrationsDir: env.get('TYPEORM_MIGRATIONS_DIR').default('./src/infra/modules/typeorm/migrations').asString(),
  },
  namingStrategy: new SnakeNamingStrategy(),
}

export default datasource
