const { Readable } = require('stream');
const { createHash } = require('crypto');

function getMD5(file, fileSystem = fs) {
  const fileStream = new FileReadableStream({ objectMode: true }, file);

  const hash = createHash('md5');

  return new Promise((resolve, reject) => {
    fileStream.on('readable', () => {
      let data;

      while (data = fileStream.read()) {
        hash.update(data);
      }

      resolve(hash.digest('hex'));
    });

    fileStream.once('error', err => {
      reject(err);
    })
  })
}

class FileReadableStream extends Readable {
  constructor(options, content) {
    super(options);
    this.content = content
  }
  _read() {
    console.log('this.content:', this.content);
    this.push(this.content, 'utf-8');
    this.push(null);
  }
}

getMD5('hello world', {}).then(res => console.log(res));
