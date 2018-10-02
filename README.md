
---------------
```sh
# clone it
clone the repo
cd "path/to/repo/"

# install dependences
npm i

# Create "config.js" file in "src" folder

content of config file:
export default {
	host: 'yourmongourl',
	jwtSecret: 'yoursecret',
	port: 4000,
	bodyLimit: '1000kb',
	corsHeaders: ['Link']
};

# Start development live-reload server
PORT=4000 npm run dev

# Start production server:
PORT=4000 npm start
```
