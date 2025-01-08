#[derive(Debug)]
struct Point {
x: i32,
y: i32,
}
fn main() {
// 绑定新变量 `p`，同时对 `Point` 进行解构
let p @ Point {x: px, y: py } = Point {x: 10, y: 23};
println!("x: {}, y: {}", px, py);
println!("{:?}", p);
let point = Point {x: 10, y: 5};
if let p @ Point {x: 10, y} = point {
println!("x is 10 and y is {} in {:?}", y, p);
} else {
println!("x was not 10 :(");
}
}
