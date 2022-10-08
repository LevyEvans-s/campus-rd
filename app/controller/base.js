const Controler = require('egg').Controller;

class BaseController extends Controler {
  success(data = {}, msg = '') {
    const { ctx } = this;
    ctx.body = {
      status: 200,
      success: true,
      msg,
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
