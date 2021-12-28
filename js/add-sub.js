class Ref {
  constructor (value) {
    this.value = value;
  }

  add (val) {
    this.value += val;

    return this;
  }

  sub (val) {
    this.value -= val;

    return this;
  }

  mul (val) {
    this.value *= val;

    return this;
  }

  div (val) {
    this.value /= val; 

    return this;
  }

  toString () {
    return this.value;
  }

  toJSON () {
    return this.value;
  }
}

function get(value) {
  return new Ref(value);
}

var res = get(0).add(1).sub(2).mul(3)

console.log(res)