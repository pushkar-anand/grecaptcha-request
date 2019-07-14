import rp from "request-promise";
import recaptchaErrors from "./error-details";

const RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";

const grecaptcha = async (recaptchaResponse,
  recaptchaSecret = process.env.RECAPTCHA__SITE_SECRET) => {

  const options = {
    method: "POST",
    uri: RECAPTCHA_URL,
    form: {
      secret: recaptchaSecret,
      response: recaptchaResponse,
    },
    json: true,
  };

  rp(options).then((body) => {

    if (body.success !== true) {
      const errors = body["error-codes"];
      errors.forEach((error) => {
        const err = recaptchaErrors[error];
        throw new Error(err);
      });
    }

  }).catch((err) => {
    throw new Error(err);
  });
};

export default grecaptcha;
