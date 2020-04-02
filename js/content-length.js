// const http = require('http');

// const server = http.createServer();

// server.on('request', (req, res) => {
//   if(req.url === '/') {
//     res.setHeader('Content-Type', 'text/plain');
//     res.setHeader('Content-Length', 8);
//     res.write("helloworld");
//   }
// })

// server.listen(8081, () => {
//   console.log("成功启动");
// })


/**
 * 测试可以得到，当 Content-Length 首部值小于等于实际传输的数据长度时
 * 通信可以完成，但小于实际长度时，接收到的数据会被截断
 * 大于实际传输的长度时，无法正常通信
 */
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write("<p>来啦</p>");
    setTimeout(() => {
      res.write("第一次传输<br/>");
    }, 1000);
    setTimeout(() => {
      res.write("第二次传输");
      res.end()
    }, 2000);
  }
})

server.listen(8009, () => {
  console.log("成功启动");
})