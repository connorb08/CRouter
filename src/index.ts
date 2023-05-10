import Router from './Crouter';

const router = new Router();


router.get('/', (req, res, {next}) => {



})

router.all('*', (req, res) => {
    return res.status(404).send('Not found');
})

router.handle(new Request(new URL("")))