const Controler = require('egg').Controller;

class BaseController extends Controler {
  success(data = {}) {
    const { ctx } = this;
    ctx.body = {
      status: 200,
      success: true,
      data,
    };
  }

  error(errMsg = '') {
    const { ctx } = this;
    ctx.body = {
      status: 500,
      success: false,
      errMsg,
    };
  }
}

module.exports = BaseController;
