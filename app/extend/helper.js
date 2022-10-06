'use strict';

const dayjs = require('dayjs');

module.exports = {
  /**
     * @param str
     * @author koto
     * @description 将字符串用base64编码
     * @date 2022-10-06 08:09
     * @version v1.0
     */
  base64Encode(str = '') {
    return new Buffer(str).toString('base64');
  },
  /**
     * @author koto
     * @description 获取格式化后的时间
     * @date 2022-10-06 08:11
     * @version v1.0
     */
  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  /**
     * @param date
     * @author koto
     * @description 获取时间戳
     * @date 2022-10-06 08:11
     * @version v1.0
     */
  timestamp(date) {
    return new Date(date).getTime();
  },
  /**
     * @param source
     * @param arr
     * @author koto
     * @description 对象属性筛选器（过滤用户密码）
     * @date 2022-10-06 08:19
     * @version v1.0
     */
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
    return null;
  },
};
