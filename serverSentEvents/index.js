const app = require('express')()

app.get('/', (req, res) => res.send('hello'))

app.get('/stream', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    })
    
    let i = 0;
    let timeoutId;
    
    res.on('close', () => {
        if (timeoutId) {
            clearTimeout(timeoutId) 
        }
        console.log('client disconnected.')
    })
    
    function send() {
        if(res.destroyed)
            return ;


        res.write(`data: hello from server -----${i++}\n\n`)
        
        timeoutId = setTimeout(send, 1000) 
    }
    
    send()
})

const port = process.env.PORT || 8888; 

app.listen(port, () => {
    console.log(`server is up and listening on port : ${port}`);
})