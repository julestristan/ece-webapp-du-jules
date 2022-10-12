const url = require('url')
const qs = require('querystring')
const myAbout = require('./content/about.json')

module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname 
        const params = qs.parse(route.query)
        console.log(path);
        console.log(route);
        console.log(myAbout['title'])
        res.writeHead(200, {'Content-Type': 'text/plain'});
      
        if (path === '/hello') {
            if('name' in params){
                if(params['name'] === 'Thomas') { // http://localhost:3000/hello?name=Thomas
                    res.write('I\'m ' + params['name'] + ' I\'m a student')
                }
                else {
                    res.write('Hello ' + params['name']) // params['name'] == params.name
                }
            }
            else {
                res.write('Hello anonymous')
            }
        }
        else if (path === '/') {
            res.write('Home page') // http://localhost:3000/
        }
        else if (path === '/about') {
            res.write(myAbout['author'])
            res.write('\n')
            res.write(myAbout['content'])
            res.write('\n')
            res.write(JSON.stringify(myAbout))
        }
        else {
          res.write('Error 4O4 page not found')
        }
        
        res.end();
    } 
}