import Axios from 'axios'
import assert from 'assert'

export default config => {
  assert(config.url, 'api url required')

  const { url, token } = config

  const SETTINGS = {
    headers: {
      Authorization: null
    }
  }
  SETTINGS.baseURL = url
  if (token) SETTINGS.headers.Authorization = `Bearer ${token}`

  const request = Axios.create(SETTINGS)
  return async function(method, endpoint, params) {
    if (!params) params = {}

    if (method === 'get') {
      params = {
        params,
      }
    }

    const { data } = await request[method](endpoint, params)

    return data
  }
}
