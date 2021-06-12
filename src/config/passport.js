var passport = require('passport')
  , localStrategy = require('passport-local').Strategy;
const Usuario = require('../app/models/usuario.model');


passport.use('local', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
  function (req,username, password, done) {

    Usuario.default.findOne({ email: username }, function (err, usuario) {
      if (err) return done(err);
      if (!usuario) return done(null, false, { message: "Email no existente o incorrecto" });

      if (!usuario.validPassword(usuario, password)) {
        console.log("NOT VALID PASSWORD");
        return done(null, false, { message: "Password incorrecto" })
      };
      //console.dir("USUARIO RETORNO PASSPORT: "+usuario);
      return done(null, usuario);
    });
  }
));
passport.serializeUser((user, done) => {
  console.log("SERIALIZE ------- User: " + user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log("DESERIALIZE ------- Id: " + id);
  Usuario.default.findById(id, (err, user) => {
    console.log("User encontrado? " + user);
    done(err, user);
  });
});


module.exports = passport;
