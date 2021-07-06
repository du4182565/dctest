package main
import(
	"encoding/json"
	"fmt"
	"os"
//	"time"
//	"io/ioutil"
)


type kpl_rank struct{
	Code string   		`json:"Code"`
	Name string		`json:"ame"`
	Rate float32		`json:"Rate"`
	Price float32		`json: Price"`
	CJE	uint64		`json:"CJE"`
	Ratio	float32		`json:"Ratio"`
	Speed	float32		`json:"Speed"`
	SJLTP	uint64		`json:"SJLTP"`
	Tude	string		`json:"Tude"`
	Buy	uint64		`json:"Buy"`
	Sell	int64		`json:"Sell"`
	ZLJE	uint64		`json:"ZLJE"`
	QJZF	float32		`json:"QJZF"`
	Tag	string		`json:"Tag"`
}

func main() {
	file, err := os.Open("kpl_rock3.json")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	fileinfo, err := file.Stat()
	if err != nil {
		fmt.Println(err)
		return
	}

	filesize := fileinfo.Size()
	buffer := make([]byte, filesize)

	bytesread, err := file.Read(buffer)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("bytes read: ", bytesread)

	var Stockrecv kpl_rank
	err = json.Unmarshal(buffer, &Stockrecv)
	if err != nil{
		fmt.Println("read error", err)
		return
	}
	fmt.Println("stockrecv:", Stockrecv)
}
