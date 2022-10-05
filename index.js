const http = require('http')
const handles = require('./handles')

const port = 3000
http.createServer(handles.serverHandle).listen(3000, () => console.log('Server is running at localhost:${port}'))
