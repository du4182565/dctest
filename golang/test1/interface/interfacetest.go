package main

type Tester interface {
	Do()
}


type FuncDo func()

func (self FuncDo) Do(){ self() }


func main(){
	dsec := int64(44 / 1e9)
	var t Tester = FuncDo( func() {println("hellp world!")} ) 
	t.Do()
}
