const nodemailer = require("nodemailer");
const configObject = require("../config/env.config");
const { logger } = require("../middlewares/logger.middleware");

class MailerController {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: configObject.mailer.email_service,
      auth: {
        user: configObject.mailer.mailer_user,
        pass: configObject.mailer.mailer_pass,
      },
    });
  }

  async SendEmailRecoveryPassword(email, token) {
    try {
      const Opt = {
        from: configObject.mailer.email_from,
        to: email,
        subject: "Pet-Shop - Recuperar contraseña",
        html: ` <div style="font-family: Arial, 
                    sans-serif; 
                    color: #333; 
                    line-height: 1.6; 
                    max-width: 600px; 
                    margin: 0 auto; 
                    border: 1px solid #ddd; 
                    padding: 20px; 
                    border-radius: 10px;"
                > 
        <div style="text-align: center; 
                margin-bottom: 20px;"
            > 
          <h1 style="color: #0D1936;">
            Pet-Shop
          </h1>
        </div> 
        <h2 style="color: #0D1936;">
            Olvidaste tu contraseña?
        </h2> 
        <p>
            Has olvidado tu contraseña? no te preocupes con el siguiente codigo de confirmacion podras actualizar tu contraseña</p> <p>codigo de confirmacion: 
            <strong style="color: #0D1936;">${token}</strong>
        </p> 
        <h3 style="color: #0D1936;">
            ¡Este token expira en una hora!
        </h3> 
        <div style="text-align: center; margin-top: 20px;"> 
          <a href="${configObject.server.base_url}/change-password" 
            style="display: inline-block; 
                background-color: #0D1936; 
                color: white; 
                text-decoration: none; 
                padding: 10px 20px; 
                border-radius: 5px; 
                font-weight: bold;"
            >
            Recuperar contraseña
          </a> 
        </div> 
      </div> `,
      };
      await this.transporter.sendMail(Opt);
    } catch (error) {
      logger.error(
        "Error al enviar Email de restablecimiento de contraseña:",
        error
      );
    }
  }
}

module.exports = MailerController;
