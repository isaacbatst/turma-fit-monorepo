if(!process.env.API_URL) {
  throw new Error('API_URL is not defined')
}

export const API_GATEWAY_URL = process.env.API_URL