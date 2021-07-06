package main
import (
    "fmt"
    "reflect"
    "unsafe"
)
type User struct { //定义一个结构类型
    Id   int
    Name string
    Age  int
}

func (u User) Hello() { //定义一个结构方法
    fmt.Println("Hello world")
}

func Info(o interface{}) { //定义一个方法，参数为空接口
    fmt.Println("User sizeof", unsafe.Sizeof(o)) 
    databytes := (*[32]byte)(unsafe.Pointer(&o))
    optr := unsafe.Pointer(&o)
    fmt.Println("o_ptr:", optr) 
    fmt.Println("byte o\n",  databytes) 
    t := reflect.TypeOf(o)         //获取接收到的接口类型
    fmt.Println("Type:", t.Name()) //获取名称

    v := reflect.ValueOf(o) //获取接口的字段
    fmt.Println("Fields:")

    //获取结构字段
    for i := 0; i < t.NumField(); i++ { //for循环，取出所拥有的字段
        f := t.Field(i)               //获取值字段
        val := v.Field(i).Interface() //获取字段的值
        fmt.Printf("%6s:%v=%v\n", f.Name, f.Type, val)
    }
    //通过接口获取结构的方法
    for i := 0; i < t.NumMethod(); i++ {
        m := t.Method(i)
        fmt.Printf("%6s:%v\n", m.Name, m.Type)
    }

}

func main() {
    u := User{1, "OK", 12} //实例化一个结构
    fmt.Println("User sizeof", unsafe.Sizeof(u)) 
    optr := unsafe.Pointer(&u)
    fmt.Println("o_ptr:" ,optr) 
    databytes := (*[32]byte)(unsafe.Pointer(&u))
    fmt.Println("byte u",  databytes) 
    Info(u)                //调用Info函数

}

/*输出
    Type: User
    Fields:
        Id:int=1
      Name:string=OK
       Age:int=12
    Hello:func(main.User)
*/ 
