import * as fs from 'fs';
import * as Koa from 'koa';

const breweries = JSON.parse(fs.readFileSync('./breweries.json', 'utf8'))
console.log(breweries);

const app = new Koa();

app.use(async (ctx: Koa.Context) => {
  ctx.body = JSON.stringify(breweries);
});

app.listen(process.env.PORT);