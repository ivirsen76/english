require('dotenv').config()

const { IE_CLIENT_HOST, IE_CLIENT_PORT } = process.env

export const baseUrl = `http://${IE_CLIENT_HOST}:${IE_CLIENT_PORT}`
export const url = path => `${baseUrl}${path}`
