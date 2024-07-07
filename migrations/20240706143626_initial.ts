import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('pieces'))) {
    await knex.schema.createTable('pieces', (t) => {
      t.increments('id').unsigned().primary().notNullable();
      t.integer('user_id').unsigned().notNullable();
      t.string('category', 100).notNullable();
      t.string('title', 100).notNullable();
      t.string('composer', 100);
      t.text('general_notes');
      t.timestamps(true);
    });
  }

  if (!(await knex.schema.hasTable('sessions'))) {
    await knex.schema.createTable('sessions', (t) => {
      t.increments('id').unsigned().primary().notNullable();
      t.integer('user_id').unsigned().notNullable();
      t.timestamps(true);
    });
  }

  if (!(await knex.schema.hasTable('blocks'))) {
    await knex.schema.createTable('blocks', (t) => {
      t.increments('id').unsigned().primary().notNullable();
      t.integer('user_id').unsigned().notNullable();
      t.integer('session_id').unsigned().notNullable();
      t.integer('piece_id').unsigned().notNullable();
      t.integer('index').unsigned().notNullable();
      t.boolean('is_completed').defaultTo(false);
      t.integer('number_of_seconds');
      t.timestamps(true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('pieces')) {
    await knex.schema.dropTable('pieces');
  }

  if (await knex.schema.hasTable('sessions')) {
    await knex.schema.dropTable('sessions');
  }

  if (await knex.schema.hasTable('blocks')) {
    await knex.schema.dropTable('blocks');
  }
}
