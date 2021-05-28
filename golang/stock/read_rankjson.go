package main
import (
	"fmt"
//	"time"
	"os"
//	"errors"
//	"io"
)

func checkFileIsExist(filename string)bool{
	var exist = true
	if _,err := os.Stat(filename);os.IsNotExist(err){
		exist = false
	}
	return exist
}

func main() {
	var filename = "kpl_rock.json"
	//data :=  make([]byte, 1024)
	var []data byte
	var f *os.File
	var count int
	var err error
	_, _ = count, err	
	if checkFileIsExist(filename){
		 f, err = os.OpenFile(filename, os.O_RDWR,0666)
		fmt.Println("file exist!!")
	}	
	count,err=f.Read(data)
	fmt.Println(string(data))
}
