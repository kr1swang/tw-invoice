import axios from 'axios'

// set action type
export const reqMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const httpReq = (method = reqMethods.GET, url, data = {}) => {
  // check method legal, if not legal assign 'GET'
  if (!Object.keys(reqMethods).includes(method)) {
    method = reqMethods.GET
    console.log('method \'' + method + '\' is not legal, assign \'GET\'.')
  }

  // creat axios config
  let config = {
    method: method,
    url: url,
    data: [reqMethods.POST, reqMethods.PUT, reqMethods.DELETE].includes(method) ? data : null,
    params: [reqMethods.GET].includes(method) ? data : null,
    baseURL: handlerCorsUrl(process.env.REACT_APP_BASE_API_URL),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    responseEncoding: 'utf8',
    responseType: 'json'
  }

  return axios(config)
}

export const handlerCorsUrl = (url) => {
  let result = url

  if (['true'].includes((process.env.REACT_APP_IS_ENABLE_CORS_ANYWHERE).toLowerCase())) {
    result = process.env.REACT_APP_CORS_ANYWHERE_API_URL + url
  }

  return result
}

export default { httpReq, handlerCorsUrl }