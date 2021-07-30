export default () => ({
  server: {
    port: parseInt(process.env.PORT), // Porta em que o servidor rodará
  },
  database: {
    type: process.env.DB_TYPE, // Tipo do banco caso seja PG, MySQL e etc
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, // Nome do banco
    entities: [__dirname + '/../**/*.entity.{js,ts}'], //Para carregar todas as entidades criadas
    migrations: ['src/migration/**/*.ts'], // Caso não use o autoLoadEntities e prefira usar migrations, configure o caminho de onde ficará suas migrations
    synchronize: true,
  },
});
