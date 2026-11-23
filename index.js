const BASE = 'https://jsonplaceholder.typicode.com';

function getData(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
}

function sortPostsByTitleLength(posts) {
  return posts.sort((a, b) => b.title.length - a.title.length);
}
function sortCommentsByName(comments) {
  return comments.sort((a, b) => a.name.localeCompare(b.name));
}

function postsCallback() {
  getData(${BASE}/posts, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts (callback):', sortPostsByTitleLength(posts));
  });
}
function commentsCallback() {
  getData(${BASE}/comments, (err, comments) => {
    if (err) return console.error(err);
    console.log('Comments (callback):', sortCommentsByName(comments));
  });
}

function fetchJson(url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  });
}

function pickUserFields(users) {
  return users.map(({ id, name, username, email, phone }) =>
    ({ id, name, username, email, phone }));
}
function filterNotCompleted(todos) {
  return todos.filter(t => !t.completed);
}

function usersPromise() {
  return fetchJson(${BASE}/users)
    .then(pickUserFields)
    .then(users => console.log('Users (promise):', users))
    .catch(console.error);
}
function todosPromise() {
  return fetchJson(${BASE}/todos)
    .then(filterNotCompleted)
    .then(todos => console.log('Todos (promise):', todos))
    .catch(console.error);
}

async function postsAsync() {
  try {
    const posts = await fetchJson(${BASE}/posts);
    console.log('Posts (async):', sortPostsByTitleLength(posts));
  } catch (e) { console.error(e); }
}
async function commentsAsync() {
  try {
    const comments = await fetchJson(${BASE}/comments);
    console.log('Comments (async):', sortCommentsByName(comments));
  } catch (e) { console.error(e); }
}
async function usersAsync() {
  try {
    const users = await fetchJson(${BASE}/users);
    console.log('Users (async):', pickUserFields(users));
  } catch (e) { console.error(e); }
}
async function todosAsync() {
  try {
    const todos = await fetchJson(${BASE}/todos);
    console.log('Todos (async):', filterNotCompleted(todos));
  } catch (e) { console.error(e); }
}

postsCallback();
commentsCallback();
usersPromise();
todosPromise();
postsAsync();
commentsAsync();
usersAsync();
todosAsync();
