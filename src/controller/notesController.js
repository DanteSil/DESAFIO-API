const knex = require("../database/knex");
const { param } = require("../routes");

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const {user_id} = request.params;

    const note_id = await knex("notes").insert({
      title,
      description,
      rating,
      user_id
    });  

    const insertTags = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(insertTags)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ user_id: id }).first();
    const tags = await knex("tags").where({note_id: note.id}).orderBy("name");

    return response.json({
      ...note,
      tags
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete()

    response.json({message: "Deletado com sucesso"})
  }

  async index(request, response) {

    const { title, user_id, tags } = request.query;

    let notes;

    if(tags) {

      const filteredTags = tags.split(',').map(tag => tag.trim())
      
      notes = await knex("tags")
      .select([
        "note.id",
        "notes.title",
        "notes.user_id",
      ])
      .where("notes.user_id", user_id)
      .where("note.title", `%${title}%`)
      .whereIn("name", filteredTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .orderBy("notes.title")
    } else {
      
    }
  }
}

module.exports = NotesController