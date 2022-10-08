'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/follow/addfollow', controller.follow.addFollow);
  router.post('/api/follow/cancelfollow', controller.follow.delFollow);
  router.get('/api/follow/following/list', controller.follow.getFollowList);
  router.get('/api/follow/follower/list', controller.follow.getFollowList);
};
