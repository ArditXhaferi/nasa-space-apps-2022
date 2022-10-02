const x = require('express');
const app = x();
const path = require('path')

app.use(x.static(__dirname + "/public"))
app.use('/build/', x.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', x.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

app.listen(4000, () =>{
    console.log('visit http://127.0.0.1:4000');
})
