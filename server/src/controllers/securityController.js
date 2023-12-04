import Security from "../modules/Security.js";

class SecurityController {
  static generateSecurityHash = async (req, res) => {
    const { msg } = req.body;
    const response = await Security.passwordHash(msg);
    res.json({
      sec: response,
    });
  }
}

export default SecurityController