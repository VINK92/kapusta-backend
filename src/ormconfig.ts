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
  host: process.env.DB_URI,
  port: 5432,
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default config;
