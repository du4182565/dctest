fn main() {
    let a = &56;
    let a_raw_ptr = a as *const i32;
    let x = 42;
    let r = &x as *const i32; 
    unsafe{
    println!("The memory address of x is: {}", *r);
    }
    unsafe{
    println!("a: {:?}, aptr: {:p}", a, a_raw_ptr);
    }
    println!("end");
}
