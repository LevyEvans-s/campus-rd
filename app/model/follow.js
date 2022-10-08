module.exports = app => {
  const { STRING } = app.Sequelize;
  const Follow = app.model.define('follow', {
    userId: STRING(20),
    followingId: STRING(20),
  }, {
    freezeTableName: true,
  });
  Follow.removeAttribute('id');
  (async () => {
    await Follow.sync({ force: false }); // force:true => delete it if exists
  })();
  return Follow;
};
