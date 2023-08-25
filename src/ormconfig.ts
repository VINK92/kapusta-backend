import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// const config: PostgresConnectionOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'q1w2e3r4',
//   database: 'kapusta',
//   synchronize: false,
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
// };

// export default config;
const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'postgres://kapustapsqluser:FrDOffMVTjZm19EFtMA602eALq70z7mR@dpg-cjjp5f8cfp5c738ikr70-a/kapustapsqldb',
  port: 5432,
  username: 'kapustapsqldb',
  password: 'FrDOffMVTjZm19EFtMA602eALq70z7mR',
  database: 'kapustapsqldb',
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default config;