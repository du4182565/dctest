package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 声明一个字符串指针的切片
    listOfNumberStrings := []*string{}

    // 预先声明一个变量，这个变量会在添加将数据添加到切片之前存储这个数据
    var numberString string

    // 从 0 到 9 的循环
    for i := 0; i < 10; i++ {
        // 在数字之前添加 `#`，构造一个字符串
        numberString = fmt.Sprintf("#%s", strconv.Itoa(i))
                fmt.Printf("Adding number %s to the slice\n", numberString)
        // 将数字字符串添加到切片中
        listOfNumberStrings = append(listOfNumberStrings, &numberString)
    }

    for _, n := range listOfNumberStrings {
        fmt.Printf("%s\n", *n)
    }
}
