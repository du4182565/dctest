package main

import "fmt"
import "time"



func main() {
ch1 := make(chan int)
ch2 := make(chan int)

go func() {
 time.Sleep(8*time.Second) 
 ch1 <- 1
}()

go func() {
 time.Sleep(18*time.Second) 
  ch2 <- 2
}()

for{
select {
case val := <-ch1:
  fmt.Println("Received from ch1:", val)
case val := <-ch2:
  fmt.Println("Received from ch2:", val)
default:
    fmt.Println("No data received")
    time.Sleep(1*time.Second)
}
 }
}
