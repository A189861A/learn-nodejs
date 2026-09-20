const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const events = require('./events');

const dataFile = path.join(__dirname, '../../data/notes.json');

async function readAll() {
  const text = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(text);
}

async function writeAll(notes) {
  await fs.writeFile(dataFile, `${JSON.stringify(notes, null, 2)}\n`, 'utf8');
}

async function list(filter = '') {
  const notes = await readAll();
  if (!filter) return notes;
  const keyword = filter.toLowerCase();
  return notes.filter((note) => {
    const haystack = `${note.title} ${note.content} ${(note.tags || []).join(' ')}`;
    return haystack.toLowerCase().includes(keyword);
  });
}

async function get(id) {
  return (await readAll()).find((note) => note.id === id) || null;
}

async function create(input) {
  const now = new Date().toISOString();
  const note = {
    id: randomUUID(),
    title: String(input.title || '未命名笔记'),
    content: String(input.content || ''),
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
    createdAt: now,
    updatedAt: now
  };
  const notes = await readAll();
  notes.push(note);
  await writeAll(notes);
  events.publish('note.created', note);
  return note;
}

async function update(id, input) {
  const notes = await readAll();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return null;
  const current = notes[index];
  const note = {
    ...current,
    ...(input.title === undefined ? {} : { title: String(input.title) }),
    ...(input.content === undefined ? {} : { content: String(input.content) }),
    ...(input.tags === undefined ? {} : { tags: input.tags.map(String) }),
    updatedAt: new Date().toISOString()
  };
  notes[index] = note;
  await writeAll(notes);
  events.publish('note.updated', note);
  return note;
}

async function remove(id) {
  const notes = await readAll();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return null;
  const [note] = notes.splice(index, 1);
  await writeAll(notes);
  events.publish('note.deleted', note);
  return note;
}

module.exports = { dataFile, readAll, list, get, create, update, remove };
