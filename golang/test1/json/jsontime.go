package main

import(
	"encoding/json"
	"fmt"
	"strconv"
	"time"
)

const(
	format="2006-01-02 15:04:05"
)

type Mytime time.Time

func (t Mytime) MarshalJSON()([]byte, error){
	b := make([]byte, 0, len(format) + 2)
	b = append(b, '"')
	b = (time.Time(t)).AppendFormat(b, format)
	b = append(b, '"')

	return b, nil
}


func (t *Mytime) UnmarshalJSON(data[] byte) (err error) {
	now, err := time.ParseInLocation(`"`+format+`"`, string(data), time.Local)
	*t = Mytime(now)
	return
}

type Person struct{
	Id int64 `json: "id"`
	Name string `json:"name"`
	Birthday Mytime
}


func (this Person) String() string{
	bytes, _:= this.Birthday.MarshalJSON()
	return "\"" + strconv.FormatInt(this.Id, 10) + " " + this.Name + " " +string(bytes)
}

func main(){

	src:= `{"id":5, "name":"xiaoming","birthday":"2016-06-30 16:09:51"}`
	var p Person
	err:=json.Unmarshal([]byte(src), &p)
	if err != nil{
	}else{
		fmt.Println(p)
	}

	bytes, err := json.Marshal(&p)
	if err!=nil{
		fmt.Println("PARS ERROR", err.Error())
	}else{
		fmt.Println(string(bytes))
	}
}



