class rectangle {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  area() {
    const area = this.width * this.height;

    return area;
  }
  paint() {
    console.log(`Paint with ${this.color}`);
  }
}
const rect = new rectangle(2, 3, "red");
const area = rect.area();
const paint = rect.paint();
console.log(area);

function random(resolve) {
  setTimeout(resolve, 3000);
}
let p = new Promise(random);
function callback() {
  console.log("Promise succeeded");
}
p.then(callback);
