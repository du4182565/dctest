fn main() {
use std::collections::HashMap;
let teams_list = vec![
("中国队".to_string(), 100),
("美国队".to_string(), 10),
("日本队".to_string(), 50),
];
let teams_map: HashMap<_,_> = teams_list.into_iter().collect();
println!("{:?}",teams_map)
}
