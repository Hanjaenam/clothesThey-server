import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_PUBLIC_KEY,
  secretAccessKey: process.env.AWS_S3_PRIVATE_KEY,
});

const multerS3PostImage = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: `${process.env.AWS_S3_BUCKET}/test`,
  }),
});

// const multerPostImage = multer({ dest: 'assets' });

export const uploadPostImage = multerS3PostImage.single('postImage');

export const deletePostImage = (req, res, next) => {
  const {
    body: { location },
  } = req;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `test/${location}`,
  };
  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    return next();
  });
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(403).end();
};
