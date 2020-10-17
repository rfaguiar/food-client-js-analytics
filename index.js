const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
    switch (req.url) {
        case "/client.js":
            fs.readFile(__dirname + "/src/client.js")
                .then(contents => {
                    res.setHeader("Content-Type", "text/javascript");
                    res.writeHead(200);
                    res.end(contents);
                }).catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
            break
        default:
            fs.readFile(__dirname + "/src/index.html")
                .then(contents => {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(contents);
                }).catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
    }

    
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});