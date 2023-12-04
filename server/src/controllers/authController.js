import Security from '../modules/Security.js';
import User from '../modules/User.js'
import UserDAO from '../../dao/UserDAO.js'

const users = []; 

class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await new UserDAO().read_one(email)
      if (!user) {
        res.json({
          message: "Logueo exitoso",
          id: user.id_user,
        });
      }
    }
    else {
      return res.json({
        error_message: "Credenciales incorrectas",
      });
    }
  };

  static register = async (req, res) => {
    const { email, password, username } = req.body;
    //Verificando Existencia de Usuario
    //TODO
    //Registrando Usuario
    const new_user = new User(Security.generateUUID(), email, password, username, new Date())
    if (new_user) {
      await new UserDAO().create(new_user)
      res.json({
        message: "Cuenta creada exitosamente",
      });
    }
    else {
      console.error(error)
      res.json({
        error_message: "El usuario ya existe",
      });
    }
  }  
}

export default AuthController