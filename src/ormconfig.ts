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

// const port = process.env.PORT as number;

const config: PostgresConnectionOptions = {
  type: 'postgres',
  url: 'postgres://kapustapsqluser:FrDOffMVTjZm19EFtMA602eALq70z7mR@dpg-cjjp5f8cfp5c738ikr70-a.frankfurt-postgres.render.com/kapustapsqldb', // process.env.DATABASE_URL as string,
  host: 'dpg-cjjp5f8cfp5c738ikr70-a', // process.env.HOST as string,
  port: 5432,
  ssl: true,
  username: 'kapustapsqluser', // process.env.USER_NAME as string,
  password: 'FrDOffMVTjZm19EFtMA602eALq70z7mR', // process.env.USER_PASSWORD as string,
  database: 'kapustapsqldb', // process.env.DB_NAME as string,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default config;
