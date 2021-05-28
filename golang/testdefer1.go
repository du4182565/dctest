package main

import("log"
        "time"
        "sync"
	"fmt"
)

var mu sync.Mutex                                                          
 
func lock(){ 
        mu.Lock() 
        log.Printf("lock") 
} 
 
func unlock(){ 
        mu.Unlock() 
        log.Printf("unlock") 
} 
 
func foo() int{ 
        lock() 
         
        func(){ 
                log.Printf("entey inner") 
                defer unlock() 
                log.Printf("exit inner")                 
        }() 
         
        time.Sleep(1 * time.Second) 
        log.Printf("return") 
        return 0; 
}


func main(){
	r := foo()
  	name := "Hello World"
    	fmt.Println(name)	
	log.Println("r=",r)
}

