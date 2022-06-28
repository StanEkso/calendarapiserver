const database = require('../database');

class ViewController {
    async createView(request, response) {
        const TABLE_PREFIX = "view_";
        const { name, places } = request.body;
        console.log (name, places)
        const isExist = await database.query(`SELECT * FROM information_schema.tables WHERE  table_name = $1`, [TABLE_PREFIX+name]);
        if (Boolean(isExist.rows.length)) return response.json({message: `Table ${TABLE_PREFIX+name} already exists`})
        const result = await database.query(`CREATE TABLE IF NOT EXISTS ${TABLE_PREFIX+name}(id SERIAL PRIMARY KEY,tg_id bigint, firstname VARCHAR,username VARCHAR)`);
        console.log(result);
        response.json({message: "OK"})
    }
    async getViews(request, response) {
        const TABLE_PREFIX = "view_";

        const result = await database.query(`SELECT table_name FROM information_schema.tables
        WHERE table_schema NOT IN ('information_schema','pg_catalog') AND table_name LIKE '${TABLE_PREFIX}%';`)

        response.json({table_names: result.rows})
    }
    async deleteViews(request, response) {
        const TABLE_PREFIX = "view_";
        const { name } = request.body;
        const isExist = await database.query(`SELECT * FROM information_schema.tables WHERE  table_name = $1`, [TABLE_PREFIX+name]);
        if (!Boolean(isExist.rows.length)) return response.json({message: `Table ${TABLE_PREFIX+name} isn't exists`})
        await database.query(`DROP TABLE ${TABLE_PREFIX+name}`);
        response.json({message: `Table ${TABLE_PREFIX+name} deleted succesfully`})
    }
    async appendView(request, response) {
        const TABLE_PREFIX = "view_";
        const { id, name, username, action} = request.body;
        const isExist = await database.query(`SELECT * FROM information_schema.tables WHERE  table_name = $1`, [TABLE_PREFIX+action]);
        if (!Boolean(isExist.rows.length)) return response.json({message: `Table ${TABLE_PREFIX+action} isn't exists`})

        const user = await database.query(`SELECT * FROM ${TABLE_PREFIX+action} WHERE tg_id = $1`,[id]);
        if (user.rows[0]) return response.json({message: "User already viewed"})
        const newUser = await database.query(`INSERT INTO ${TABLE_PREFIX+action} (tg_id, firstname, username) values ($1, $2, $3) RETURNING *`,
        [id, name, username]);
        response.json({message: "Succesfully added", data: newUser.rows})
    }
    async getUsersViews(request, response) {
        const TABLE_PREFIX = "view_";
        const name = request.params.name;
        const isExist = await database.query(`SELECT * FROM information_schema.tables WHERE  table_name = $1`, [TABLE_PREFIX+name]);
        if (!Boolean(isExist.rows.length)) return response.json({message: `Table ${TABLE_PREFIX+name} isn't exists`})

        const result = await database.query(`SELECT * FROM ${TABLE_PREFIX+name}`);
        response.json(result.rows)
    }
}


module.exports = new ViewController()