const app = require('./server-config.js');
const routes = require('./server-routes.js');
const createOrganization = require('./routes/organization/createOrganization.js');

const port = process.env.PORT || 5000;

app.get('/api/v1/organization/:id');
app.patch('/api/v1/organization/:id');
app.post('/api/v1/organization', createOrganization);
app.delete('/api/v1/organization/:id');




app.get('/api/v1/', routes.getAllTodos);
app.get('/api/v1/:id', routes.getTodo);

app.post('/api/v1/', routes.postTodo);
app.patch('/api/v1/:id', routes.patchTodo);

app.delete('/api/v1/', routes.deleteAllTodos);
app.delete('/api/v1/:id', routes.deleteTodo);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;