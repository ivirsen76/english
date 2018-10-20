const mediaUrl = `//${process.env.IE_SERVER_HOST}:${process.env.IE_SERVER_PORT}/media`

export const getMediaUrl = path => (path ? `${mediaUrl}/${path}` : mediaUrl)
