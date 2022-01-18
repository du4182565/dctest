package main

import("fmt"
	"reflect"
)


type Valw  map[string][]string


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
	var temp1 Valw
	fmt.Println(temp1)
	temp2 := Valw{
		"dwq":{"dwq","ddq"},
	}
	_  = temp2
}
