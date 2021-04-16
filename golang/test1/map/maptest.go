package main

import("fmt"
	"reflect"
)


func main(){
	temp := map[string]string{
		"vw":"dazhong",
		"bmw":"baoma",
	}
	var git interface{}
	value , ok := temp["vw"]
	bytest := []byte(value)
	 
	fmt.Println(reflect.TypeOf(git))
	fmt.Println(reflect.TypeOf(bytest))
	fmt.Println(value,reflect.TypeOf(value))
	git="volk"
	if ok && "dazhong" == value{
		temp["vw"],_ = git.(string)
	}
	fmt.Println(reflect.TypeOf(git))
	fmt.Println(temp)
}
