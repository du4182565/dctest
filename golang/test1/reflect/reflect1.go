package main 
     
import ( 
    "fmt"
    "reflect"
) 
   
// Main function 
type T struct {} 
  
func (t *T) GFG() { 
    fmt.Println("GeeksForGeeks") 
} 
  
func main() { 
    var t T 
 //   reflect.ValueOf(&t).MethodByName("GFG").Call([]reflect.Value{}) 
    reflect.ValueOf(&t).MethodByName("GFG").Call(nil) 
}
