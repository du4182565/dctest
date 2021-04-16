package main

import (
	"time"
	"fmt"
	"reflect"
)

func main(){
//	time1 := time.Now()
//	s := "2021-01-13  150405"
//	time1, err := time.Parse("2006-01-02 150405",s)
	
	if err != nil{
		fmt.Println(err)
	}
	
	fmt.Println(time1)
	fmt.Println("reflect type1", reflect.TypeOf(s))
	fmt.Println("reflect type1", reflect.TypeOf(time1))
	fmt.Println("reflect value", reflect.ValueOf(time1))
}
