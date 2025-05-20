package main

import (
    "fmt"
    "time"
)

// 全局变量，用于存储上下文信息
var (
    deadline time.Time
        requestID string
)

func main() {
// 设置上下文信息
    deadline = time.Now().Add(5 * time.Second)
        requestID = "123456"
            // 启动一个 goroutine 来处理任务
go func() {
          for {
                select {
            case <-time.After(1 * time.Second):
    			fmt.Println("goroutine 1: doing some work")
    default:
        time.Sleep(1 * time.Second)
  // 检查上下文信息，如果已经超时或被取消了，就退出循环
  	if time.Now().After(deadline) {
                fmt.Println("goroutine 1: context canceled")
                        return
}
}
  }
        }()

// 启动另一个 goroutine 来处理任务
  time.Sleep(13 * time.Second)
  fmt.Println("main: context canceled")
}
