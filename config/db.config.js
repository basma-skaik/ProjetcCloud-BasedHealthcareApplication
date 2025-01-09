module.exports = {
  HOST: process.env.HOST ||3306,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DATABASE,
  dialect: process.env.dialect || 'mysql',
  storage: "./h2_database.sqlite",
  logging: false , 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};