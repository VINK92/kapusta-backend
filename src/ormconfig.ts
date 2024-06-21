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
  url: process.env.DATABASE_URL,
  host: process.env.HOST,
  port: Number(process.env.POSTGRES_PORT),
  ssl: Boolean(process.env.POSTGRES_SSL),
  username: 'postgres', // process.env.POSTGRES_USER_NAME,
  password: 'q1w2e3r4', // `${process.env.POSTGRES_USER_PASSWORD}`,
  database: process.env.POSTGRES_DB_NAME,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: true,
};

export default config;
