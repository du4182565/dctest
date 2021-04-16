package main

import(
	"fmt"
	"reflect"
)

type Your1 struct{
}

func (y *Your1) MethodBar(){
	fmt.Println("MethodBar called")
}

type Your2 struct{
}

func (y *Your2) MethodFoo(i int, oo string){
	fmt.Println("Method called")
}

func InvokeObjectMethod(object interface{}, methodName string, args ...interface{}){
	inputs := make([]reflect.Value, len(args))
	for i, _ := range args{
		inputs[i] = reflect.ValueOf(args[i])
	}
	reflect.ValueOf(object).MethodByName(methodName).Call(inputs)
}

func main(){
	aa := Your1{}
	v := reflect.ValueOf(aa)
	fmt.Println("vKind is", v.Kind())
	InvokeObjectMethod(new(Your1), "MethodBar")
	InvokeObjectMethod(new(Your2), "MethodFoo",10, "abc")
}


