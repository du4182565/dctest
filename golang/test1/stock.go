package main
/*	开盘啦综合排行榜数据
        
        url
        ----------
        https://pchq.kaipanla.com/w1/api/index.php?c=StockRanking&a=RealRankingInfo&Date=2020-02-14&RStart=0925&REnd=0930&Ratio=6&Type=6&Order=1&index=0&st=3999&UserID=480440&Token=1f858c7b615065e54e074ced301ed8a1

        url参数：
        ----------
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
	"io/ioutil"
	"net/http"
	"time"
	"os"
)

func main() {
	// Instantiate default collector
        Date := time.Now().Format("2006-01-02") 
        RStart  := "0930"
        REnd  := "1500"
        Ratio := 6
        Type  := 6
        Order := 1
        index := 0
        st := 3800
        UserID  := 480440 
        Token  :=  "1f858c7b615065e54e074ced301ed8a1"
	url :=  fmt.Sprintf("https://pchq.kaipanla.com/w1/api/index.php?c=StockRanking&a=RealRankingInfo&Date=%s&RStart=%s&REnd=%s&Ratio=%d&Type=%d&Order=%d&index=%d&st=%d&UserID=%d&Token=%s",Date,RStart,REnd,Ratio,Type,Order,index, st,UserID,Token)
	
	fmt.Println("%s", url)
	resp, err := http.Get(url)
	if err != nil{
		fmt.Println("http get error", err)	
		return
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil{
		fmt.Println("read error", err)
		return
	}
	var filename="kpl_rock.json"
	var f *os.File
	f, err = os.Create(filename)
	defer f.Close()
	f.Write(body)
	f.Sync()

	fmt.Println(string(body))
}
