const AWS = require('aws-sdk')

AWS.config.update({
    region: process.env.IE_AWS_DEFAULT_REGION,
})
const s3 = new AWS.S3()

module.exports = async filename => {
    if (process.env.NODE_ENV !== 'production') {
        return
    }

    await s3
        .deleteObject({
            Bucket: process.env.IE_AWS_S3_BUCKET,
            Key: `public/sounds/${filename}`,
        })
        .promise()
}
