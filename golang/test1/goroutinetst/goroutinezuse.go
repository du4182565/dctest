package main

import(
	"fmt"
	"time"
)
func funa(c chan int){
	time.Sleep(3 * time.Second)
	c<- 1
}

func main(){
	c := make(chan int, 3)
	go funa(c)
	a:= <-c
	fmt.Println(a)
	return
}
