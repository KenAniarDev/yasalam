import nodemailer from 'nodemailer';

export const mailHelper = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: process.env.NEXT_PUBLIC_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });

  // const message = {
  //   from: options.from, // sender address
  //   to: options.email, // list of receivers
  //   subject: options.subject, // Subject line
  //   text: options.message, // plain text body
  //   // html: `<a>Hello world?</a>`, // html body
  // };

  // send mail with defined transport object
  await transporter.sendMail(options);
};
