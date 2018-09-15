const AWS = require('aws-sdk')

const s3 = new AWS.S3()

module.exports = async filename => {
    if (process.env.NODE_ENV !== 'production') {
        return
    }

    await s3
        .deleteObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `public/sounds/${filename}`,
        })
        .promise()
}
