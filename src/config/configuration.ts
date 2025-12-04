export default () => ({
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASS: process.env.DB_PASS || 'postgres',
  DB_NAME: process.env.DB_NAME || 'auctions',
  PORT: parseInt(process.env.PORT || '3000', 10),
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost:5672/',
  EXCHANGE_NAME: process.env.EXCHANGE_NAME || 'auctions_exchange',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/auctions_search'
});
