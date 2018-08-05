const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const Static = require('koa-static');
const app = new Koa();
const router = new Router();
const staticPath = '/strategy';

const register = (ctx, next) => {
  ctx.response.body = 'register success'
  next()
};

const main = (ctx, next) => {
  ctx.response.body = 'Hello World';
};

const postRegister = (ctx, next) => {
  let body = ctx.request.body;
  let name = body.userName;
  let pw = body.password;
  let phone = body.phoneNumber;
  console.log(`${new Date()} param: userName: ${name}, password: ${pw}, phoneNumber: ${phone} `)
  ctx.response.body = {
    name,
    pw,
    phone,
    status : 0
  }
}

router.get('/', main)
      .get('/register', register)
      .post('/register', postRegister)

app.use(Static(path.join(__dirname, '/strategy')))
app.use(koaBody())
app.use(router.routes())
    .use(router.allowedMethods());


app.listen(8888);
console.log('Server run on port 8888')
