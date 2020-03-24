function Book (title, time, type) {
  if (this instanceof arguments.callee) {
    console.log(this, title, time, type);
    this.title = title;
    this.time = time;
    this.type = type;
  } else {
    return new Book(title, time, type);
  }
}

var book = Book('js', '2014', 'js');

console.log(book);
book.ctor = Book;

var _book = book.ctor('js', '2015', 'js');
console.log(_book, book);