const nodemailer = require('nodemailer');
const { email, passowrd } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: passowrd
    }
});


exports.sendMail = (destinatario, cuerpo) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: 'voidstore@voidagencia.co',
        to: destinatario,
        subject: 'Cambio de contraseña',
        text: cuerpo,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
          reject(error); // Rechazar la promesa en caso de error
        } else {
          resolve(true);
        }
      });
    });
  };