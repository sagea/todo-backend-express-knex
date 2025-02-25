import app from './server-config.js';
import { generateRoutes } from './server-routes.js';
import {createOrganizationEndpoint} from './routes/organization/createOrganization.js';
import {getOrganizationEndpoint} from './routes/organization/getOrganization.js';

const port = process.env.PORT || 5000;

app.get('/api/v1/organization/:id', getOrganizationEndpoint);
app.patch('/api/v1/organization/:id');
app.post('/api/v1/organization', createOrganizationEndpoint);
app.delete('/api/v1/organization/:id');



const routes = generateRoutes();
app.get('/api/v1/', routes.getAllTodos);
app.get('/api/v1/:id', routes.getTodo);

app.post('/api/v1/', routes.postTodo);
app.patch('/api/v1/:id', routes.patchTodo);

app.delete('/api/v1/', routes.deleteAllTodos);
app.delete('/api/v1/:id', routes.deleteTodo);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Unknown error');
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;