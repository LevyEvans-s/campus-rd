'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async detail() {
      const {ctx}=this
      ctx.body='detail page'
  }
}

module.exports = HomeController;
