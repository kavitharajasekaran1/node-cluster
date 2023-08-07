const express = require('express');
const app = express();
const os = require('os');
const numCpu = os.cpus().length;
const cluster = require('cluster')

app.get('/', (req,res)=>{

    for(i=0;i<1e8; i++) {

    }
    res.send(`...ok ${process.pid}`)
    cluster.worker.kill()
})

if(cluster.isMaster) {

    for(i=0;i< numCpu;i++) {
        cluster.fork() // uses the child process.
    }
    cluster.on('exit', (worker, code, signal)=>{
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork() //once worker died we are creating new worker.
    })
}
    else {
        app.listen(5000, ()=> console.log(`server is running 5000 process id is ${process.pid}`))
    }

    // app.listen(5000, ()=> console.log(`server is running 5000 process id is ${process.pid}`))



