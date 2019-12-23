import cloudinary from 'cloudinary'

const { api_key, api_secret} = process.env

export default (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'This endpoint only responds to POST requests'
    })
  }

  const { body } = req

  if (!body) {
    return res.status(400).json({
      error: 'Missing request body'
    })
  }

  let b

  try {
    b = JSON.parse(body)
  } catch (err) {
    return res.status(400).json({
      error: 'Invalid request body'
    })
  }

  const { image } = b

  if (!image) {
    return res.status(400).json({
      error: 'Missing image in request body'
    })
  }

  console.log('Uploading to cloudinary...')

  cloudinary.v2.uploader.upload(
    image,
    {
      cloud_name: 'dsdlhtnpw',
      api_key,
      api_secret,
    },
    (err, result) => {
      console.log(err, result)
      if (err) {
        return res.status(500).json({
          error: err
        })
      }

      return res.status(200).json({
        message: 'Successfully uploaded to cloudinary'
      })
    }
  )
}
