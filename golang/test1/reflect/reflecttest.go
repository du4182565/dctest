package main


import(
	"fmt"
	"reflect"
)

func main(){
	var x float64 = 3.14
	v := reflect.ValueOf(x)
	fmt.Println("TypeOf:", reflect.TypeOf(x))
	fmt.Println("ValueOf:", reflect.ValueOf(x))
	fmt.Println("kind is floate64", v.Kind() == reflect.Float64)
	fmt.Println("vkind is :", v.Kind(), reflect.Float64)
	fmt.Println("vkind type is :", reflect.TypeOf(v.Kind()), reflect.Float64)
	fmt.Println("value:", v.Float())
}
