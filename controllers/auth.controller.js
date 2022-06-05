const database = require('../database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}
class AuthController{ 
    async createUser(request, response) {
        const {username, password} = request.body;
        console.log(username, password) 
        const user = await database.query("SELECT * FROM users  WHERE username = $1",[username])
        if (user.rows[0]) return response.json({message: "This user already exist"})

        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password, salt)

        const newUser = await database.query("INSERT INTO users (username, password) values ($1, $2) RETURNING *",
                                 [username, hashPassword])
        response.json(newUser.rows[0])
    }
    async deleteUser(request, response) {
        const id = request.params.id;
        const result = await database.query("DELETE FROM users WHERE id = $1", [id]);
        response.json(result.rows[0])
    }
    async getUsers(request, response) {
        const users = await database.query("SELECT * FROM users");
        response.json(users.rows)
    }
    async logIntoAccount(request, response) {
        const {username, password} = request.body;
        const user = await database.query("SELECT * FROM users  WHERE username = $1",[username])
        if (!user.rows[0]) return response.json({message: "This user isn't exist"})

        const validPassword = bcrypt.compareSync(password, user.rows[0].password);

        if (!validPassword) return response.json({message: "Incorrect password"});

        const token = generateAccessToken(user.rows[0].id);
        response.json({token: token})
    }
}

module.exports = new AuthController();