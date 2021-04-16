package main

import("fmt"
	"net/http"
	"reflect"
)


func main(){
	fmt.Println(reflect.TypeOf([]string{"123"}))
	hdr := http.Header{"User-Agent" : []string{"123"}}
	fmt.Println(reflect.TypeOf(hdr))
}
