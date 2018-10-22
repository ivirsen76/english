const mediaUrl = `${process.env.IE_SERVER_URL || ''}/media`

export const getMediaUrl = path => (path ? `${mediaUrl}/${path}` : mediaUrl)
