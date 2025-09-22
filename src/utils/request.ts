import axios, { type AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * @description 是否直接返回 Axios 的原始响应对象（包括 headers, status 等），默认为 false
     */
    withAxiosData?: boolean;
    /**
     * @description 请求时是否不需要携带 token，默认为 false
     */
    withoutToken?: boolean;
  }
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
});

service.interceptors.request.use(
  config => {
    // TODO: Add token to request header
    // if (config.withoutToken !== true) {
    //   const token = localStorage.getItem('token')
    //   if (!token) {
    //     // TODO: Handle unauthorized access
    //     // window.location.href = '/login'
    //     return Promise.reject(new Error('Unauthorized'))
    //   }
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    if (response.config.withAxiosData) {
      return response;
    }
    const apiData = response.data;
    // 处理业务代码的成功响应, 假设 10000 是成功的业务代码
    // const successCode = 10000
    // if (apiData.code === successCode) {
    //   return apiData.data
    // }
    return apiData;
    // return Promise.reject(new Error(apiData.message || 'Error'))
  },
  /**
   * 失败的响应会进入这里（网络错误、HTTP 状态码非 2xx）
   */
  error => {
    console.error('Response Error:', error);
    if (error.response) {
      const handleError = handleErrorMap.get(error.response.status);
      if (handleError) handleError(error);
    }
    return Promise.reject(error);
  },
);

/**
 * 封装一层 request 函数，为所有请求方法提供类型支持
 * @param config axios 请求配置
 * @returns Promise<T> T 是后端返回数据中 data 字段的类型
 */
export const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return service(config);
};

export const http = {
  get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return request({ url, method: 'GET', params, ...config });
  },
  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return request({ url, method: 'POST', data, ...config });
  },
  // TODO: Add other request methods
  // put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
  //   return request({ url, method: 'PUT', data, ...config })
  // },
  // delete<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
  //   return request({ url, method: 'DELETE', params, ...config })
  // },
};

const handleErrorMap = new Map<number, (error: any) => void>([
  [
    401,
    error => {
      alert('认证失败，请重新登录');
      console.error('Unauthorized:', error);
      // TODO: 处理 401，例如清除本地 token 并跳转到登录页
      localStorage.removeItem('token');
      // window.location.href = '/login'
    },
  ],
  [
    500,
    error => {
      alert('服务器内部错误，请稍后重试');
      console.error('Server Error:', error);
    },
  ],
]);
