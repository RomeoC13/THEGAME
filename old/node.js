let fs = require('fs');
const http = require("http");
const url_parser = require("url");
let server = http.createServer((req, res) => {

        let url = url_parser.parse(req.url, true);
        let type = "text/html";

        //console.log(req.url);
        console.log(url.pathname);

        switch (url.pathname) {
            case "/":
                var path = "public/nothing.html";
                break;
            case '/game':
                var path = "public/welcome.html";
                break;
            default:
                type = "text/" + url.pathname.substring(url.pathname.lastIndexOf('.') + 1);
                var path = "public" + url.pathname;
        }

        console.log(type);
        console.log(path);


        if (fs.existsSync(path)) {
            let contents = fs.readFileSync(path);
            res.writeHead(200, {
                'Content-type': type
            })
            ;
            res.end(contents);
        } else {
            res.writeHead(404);
            res.end("404 not found");
        }
    }
    )
;

const port = 3000;
server.listen(port, () => console.log(`http server on port ${port} !`));