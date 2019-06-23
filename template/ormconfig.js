module.exports = {
  type: 'postgres',
  url: process.env.DB_URL || 'postgres://postgres@localhost/dsh-mp',
  entities: [process.env.TYPEORM_ENTITIES || "src/**/*.entity.ts"],
  synchronize: true
}