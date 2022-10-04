// Necessary imports
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
                if(params['name'] === 'Thomas') {
                    res.write('I\'m ' + params['name'] + ' I\'m a student')
                }
                else {
                    res.write('Hello ' + params['name'])
                }
            }
            else {
                res.write('Hello anonymous')
            }
        }
        else if (path === '/') {
            res.write('Home page')
        }
        else if (path === '/about') {
            res.write(myAbout['author'])
            res.write(myAbout['content'])
        }
        else {
          res.write('Error 4O4 page not found')
        }
        
        res.end();
    } 
  }