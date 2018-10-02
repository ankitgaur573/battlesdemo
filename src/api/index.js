import { Router } from 'express';
import { version } from '../../package.json';
import requireAuth from '../middleware/require-auth';
import authApi from './auth';
import registerApi from './register';
import countApi from './count';
import listApi from "./list";
import statsApi from "./stats";
import searchApi from "./search"

const api = Router();

api.use('/auth', authApi);
api.use('/register', registerApi);

//------------
api.use('/count', requireAuth, countApi);
api.use('/list', requireAuth, listApi);
api.use('/stats', requireAuth, statsApi);
api.use('/search', requireAuth, searchApi);

//------------

api.get('/', (req, res) => {
	res.json({ version });
});

export default api;
