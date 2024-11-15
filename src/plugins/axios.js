import axios from 'axios';
import router from '@/router/router';
import { message, notification } from 'ant-design-vue';

const request = axios.create({
  baseURL: '/api'
});

const err_code = {
  403: "权限出错，请检查你的登录状态或退出登录重试。",
  404: "资源不存在，请检查你的数据请求路径。",
  400: "参数有误，请检查你的参数是否按照格式正确填写。",
  500: "服务发生内部错误，请联系系统管理员。"
};

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async(error) => {
    if (error.response.data instanceof Blob) {
      var blob = new Blob([error.response.data]);
      var data = await blob.text();
      error.response.data = JSON.parse(data)
    };
    var status = error.response.status;
    var route = router.currentRoute.value.fullPath;
    console.log(route)
    if (!route.includes("/user/login")) {
      message.info(`${status + " " + err_code[status]} 错误代码：${error.response.data.msg}`);
    }
    if (error.response.data.err_reason){
      notification.warn({
        message: "发生错误，请联系开发者",
        description: error.response.data.err_reason,
      });
    }
    if (status == 403 && !route.includes("/user/login")) {
      router.push("/user/login");
    }
    return Promise.reject(error);
  }
);

export default request