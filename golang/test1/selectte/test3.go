package main 
import(
	"fmt"
	"time" 
) 

func main() { 	
 fmt.Println("嗨客网(www.haicoder.net)") 	
        ch := make(chan int)
	for{

	
	    select { 	
	        case <-ch: 		
        fmt.Println("received from ch") 	
	        case <-time.After(time.Second * 2): 		
		fmt.Println("select timer after timeout") 	
		default:
			time.Sleep(3*time.Second)
		fmt.Println("default print") 	
	}
 }}
