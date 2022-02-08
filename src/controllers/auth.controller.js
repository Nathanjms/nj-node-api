const User = require("../models/User");
const {
  verifyNoValidationErrors,
} = require("../middleware/verifyNoValidationErrors");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  let inputErrs = verifyNoValidationErrors(req, res);
  if (!inputErrs.success) {
    return res.status(400).send({ errors: inputErrs.errors });
  }

  console.log(bcrypt.hashSync(req.body.password, 8));
  await User.insertUser(
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  )
    .then(() => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.signin = (req, res, next) => {
  verifyNoValidationErrors(req, res);
  User.getUserFromEmail(req.body.email)
    .then((user) => {
      console.log(user);
      if (!user || user.length === 0) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log(req.body.password, user);
      let passwordIsValid = bcrypt.compareSync(
        req?.body?.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
  //     var token = jwt.sign({ id: user.id }, config.secret, {
  //       expiresIn: 86400, // 24 hours
  //     });

  //     var authorities = [];
  //     user.getRoles().then((roles) => {
  //       for (let i = 0; i < roles.length; i++) {
  //         authorities.push("ROLE_" + roles[i].name.toUpperCase());
  //       }
  //       res.status(200).send({
  //         id: user.id,
  //         username: user.username,
  //         email: user.email,
  //         roles: authorities,
  //         accessToken: token,
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ message: err.message });
  //   });
};
