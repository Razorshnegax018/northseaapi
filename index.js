import Koa from "koa";
const app = new Koa();
import r from "koa-router";
import send from "koa-send";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import { Server } from "socket.io";
const router = new r();
const __dirname = dirname(fileURLToPath(import.meta.url));
const io = new Server(app);
let bag = [
    {
        name: "Bow",
        amt: 1
    },
    {
        name: "Arrow",
        amt: 20
    },
    {
        name: "Shield-Plate",
        amt: 5
    }
];
let regcontroller = {
    listAllStuff: ({ response }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: bag
        };
    },
    newItem: ({ request, response }) => {
        response.status = 200;
        const req = request.body.data;
        bag.push(req);
        response.body = {
            success: true,
            data: req
        };
    }
};
const port = 3000;
router
    .get('/', async (ctx) => {
    await send(ctx, './public/index.html');
    ctx.response.status = 200;
})
    // route to /hello with a basic response
    .get('/hello', (ctx) => {
    // Just sends a simple response. You could use this to make an API...
    ctx.response.body = "Hello World!";
    ctx.response.status = 200;
})
    // redirect route
    .get('/redirect', (ctx) => {
    // redirects the user to another website
    ctx.response.redirect("https://repl.it/@razorshnegax");
})
    .get('/list', regcontroller.listAllStuff);
router.get('/fire', async (ctx) => {
    await send(ctx, './public/CannonFireAnim.mp4');
    ctx.response.status = 200;
});
router.get('/post', (ctx) => {
    axios.post('https://northseaapi.razorshnegax.co/newitem', {
        name: 'I love men',
        amt: 21
    }).then((res) => {
        console.log(res);
    });
    ctx.response.body = 'hey';
    ctx.response.status = 200;
});
router.get('/wasm', async (ctx) => {
    await send(ctx, './wasm/test.wasm');
});
router.post('/newitem', regcontroller.newItem);
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
io.on('connection', (socket) => {
    console.log('a user connected');
});
app.listen(port, () => {
    console.log("Server started!");
});
