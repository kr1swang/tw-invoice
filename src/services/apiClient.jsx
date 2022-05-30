import axios from 'axios'

// set action type
export const reqMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const apiClient = async (method = reqMethods.GET, url, data = {}) => {
  // check method legal, if not legal assign 'GET'
  if (!Object.keys(reqMethods).includes(method)) {
    method = reqMethods.GET
    console.log(`method ${method} is not legal, assign 'GET'.`)
  }
  // creat axios config
  const config = {
    method: method,
    url: url,
    data: [reqMethods.POST, reqMethods.PUT, reqMethods.DELETE].includes(method) ? data : null,
    params: [reqMethods.GET].includes(method) ? data : null,
    responseEncoding: 'utf8',
    responseType: 'json'
  }

  return axios(config)
}
