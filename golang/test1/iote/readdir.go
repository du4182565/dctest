package main
import (
"fmt"
. "io/ioutil"
)
func readAll(path string) []string {
        var all_file []string
        finfo, _ := ReadDir(path)
        for _ ,x := range finfo {
                real_path := path + "/" + x.Name()
                //fmt.Println(x.Name()," ",x.Size())
                if x.IsDir() {
                        fmt.Println(x.Name()," ",x.Size())
                        all_file = append(all_file,readAll(real_path)...)
                }else {
                        all_file = append(all_file,real_path)
                }
        }
        return all_file
}
func main(){

        var path string = string("/home/ducan")
        //var all_file []string //= make([]string,1000)
        all_file := readAll(path)
        for _,data := range all_file {
                if len(data) > 0 {
                        fmt.Println(data)
                }
        }
}
