package main
/*	开盘啦综合排行榜数据
        
        url
        ----------
        https://pchq.kaipanla.com/w1/api/index.php?c=StockRanking&a=RealRankingInfo&Date=2020-02-14&RStart=0925&REnd=0930&Ratio=6&Type=6&Order=1&index=0&st=3999&UserID=480440&Token=1f858c7b615065e54e074ced301ed8a1

        url参数：
      ---------
        Date 日期 例如2019-06-14
        RStart 开始时间 0925
        REnd 截止时间 1500
        Ratio 流通市值范围 0 50万 1 100万 2 200万 3 300万 4 500万 5 1000万 6 全部
        Type 排序字段 6 按涨幅排序
        Order 排序规则 1 降序 2 升序
        index 获取股票数据开始索引 默认值 0 默认从索引0的数据获取
        st 获取股票个数 默认值 3800 目前股票数量小于3800
        UserID 开盘啦用户id
        Token 对应用户令牌
*/



import (
	"fmt"
//	"bufio"
//	"io"
//	"io/ioutil"
//	"net/http"
//	"time"
	"os"
//	"strconv"
//	"encoding/json"
)
/*
type kpl_rank struct{
		Code string   		//stock daima		
		Name string		//stock name
		Rate float32		//zhang die fu
		Price float32		//shou panjia
		CJE	uint64		//chengjiaoe
		Ratio	float32		//shi ji huan shou lv
		Speed	float32		//zhang su
		SJLTP	uint64		//shi ji liu tong zhi
		Tude	string		//ban kuai
		Buy	uint64		//zhu li mai
		Sell	uint64		//zhu li mai
		ZLJE	uint64		//zhu li jing e
		QJZF	float32		//qu jian zhang fu
		Tag	string		//you zi "fang xin xia"
}

type TimeStamp time.Time 

type kpl_ranks struct{
		stocks 		[]kpl_rank  			
		Ts 		TimeStamp	
		stockTotalCount	uint16		
		Day		[]string	
		Ttag		float32
		errcode		string			
}


func (d TimeStamp) MarshalJSON()([]byte, error){
	dts, err := strconv.ParseInt(d.(string), 10, 64)	
	if err != nil {
		fmt.Println("json trans timestamp err", err)
		return _, err
	}
	ts := time.Unix(dts, 0).Format("2006-01-02")
	return ts, er
}

func (d *TimeStamp)UnmarshalJSON(data []byte) error{
	*d,er :=time.Parse("2006-01-02", rs)
	if er!=nil{
		return er
	}
	return nil	
}
*/
func checkFileIsExist(filename string)bool{
        var exist = true
        if _,err := os.Stat(filename);os.IsNotExist(err){
                exist = false
        }
        return exist
}

func main() {
	var filename = "kpl_rock.json"
	var err error
	var f *os.File
	var count int
	_ = count	
	if checkFileIsExist(filename){
		f, err = os.OpenFile(filename,os.O_RDWR,0666)
		if err != nil{
			fmt.Println("open file %s error", filename)
		}
		defer f.Close()	
		fmt.Println("file exist!!")
	}
	
	fileinfo, err := f.Stat()
	if err != nil{	
		fmt.Println("open file %s error", filename)
	}

	count = int(fileinfo.Size())
	data := make([]byte, count)
	count, err = f.Read(data)
	fmt.Println(string(data))
/*		
	var stockrecv kpl_ranks 
	err := json.Unmarshal(body, &stockrecv)	
	if err != nil{
		fmt.Println(err)
	}
	for _, item := range stockrecv.stocks{
		fmt.Println(item)
	}
	fmt.Println(string(body))
*/
}
