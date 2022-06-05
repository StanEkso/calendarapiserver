const database = require('../database');

class PostController {
    async createPost(request, response) {
        const { date, title } = request.body;
        const newPost = await database.query("INSERT INTO posts (date, title) values ($1, $2) RETURNING *", [date, title]);
        response.json(newPost.rows[0]);
    }
    async deletePost(request, response) {
        const id = request.params.id;
        const deletedPost = await database.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
        response.json(deletedPost.rows[0])
    }
    async getPosts(request, response) {
        const posts = await database.query('SELECT * FROM posts');
        response.json(posts.rows);
    }
    async updatePost(request, response) {
        const {id, title, date} = request.body;
        const updated = await database.query("UPDATE posts set title = $1, date = $2 WHERE id = $3 RETURNING *", [title, date, id])
        response.json({message: "updated"})
    }
}

module.exports = new PostController();