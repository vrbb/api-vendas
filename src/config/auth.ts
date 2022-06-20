export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expires: '1d',
  },
};
