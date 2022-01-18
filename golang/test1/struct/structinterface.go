package main

import "fmt"

type Worker struct {
	Name string
	Age int
	Salary
}

func (w Worker) fun1() {
	fmt.Println("Worker fun1")
}

type Salary struct {
	Money int
}

func (s Salary) fun1() {
	fmt.Println("Salary fun1")
}
func (s Salary) fun2() {
	fmt.Println("Salary fun2")
}

func main() {
	s := Salary{}
	w := Worker{Salary: s}
	
	fmt.Println(w)
	fmt.Println(w.Name)
	fmt.Println(w.Age)
	w.fun1()
	w.fun2()
	w.Salary.fun1()
	w.Salary.fun2()
}
