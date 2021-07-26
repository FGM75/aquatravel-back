require("dotenv").config();
const debug = require("debug")("api-aquatravel:nodemailer:email");
const nodemailer = require("nodemailer");

const usuario = process.env.USER_EMAIL;
const password = process.env.PASS_EMAIL;

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 8000,
  secure: false,
  auth: {
    user: usuario,
    pass: password,
  },
});

const enviarCorreo = (name, email, confirmationCode) => {
  const mensaje = {
    from: usuario,
    to: email,
    subject: "Porfavor, verifica tu cuenta",
    html: `<h1 style="text-align:center;">Email de verificación</h1>
        <h2 style="text-align:center;">Hola ${name}</h2>
        <p>Grácias por registrarte en AquaTravel. Porfavor confirma tu email en el siguiente enlace:</p>
        <a href=${process.env.URL_ENDPOINT_CONFIRM_USER}${confirmationCode}> Clica aquí</a>
        </div>`,
  };
  transport.sendMail(mensaje, (err, info) => {
    if (err) {
      debug("No he podido enviar el correo");
      debug(err.message);
    } else {
      debug("Correo enviado");
    }
  });
};

module.exports = {
  enviarCorreo,
};
