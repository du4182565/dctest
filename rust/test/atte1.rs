fn main() {
match 1 {
num @ (1 | 2) => {
println!("{}", num);
}
_ => {}
}
}

