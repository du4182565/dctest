package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

// 定义客户端提交的post请求的json数据内容
type  Auth struct {
	Username string `json: username`
	Password string `json: password`
}

// 定义服务端返回json数据给客户端的内容
type Resp struct {
	Code string `json: code`
	Msg string `json: msg`
}


func f1(w http.ResponseWriter,r *http.Request){
	str := `from home`
	w.Write([]byte(str))
}

func f2(w http.ResponseWriter,r *http.Request){
	b,err := ioutil.ReadFile("./html/index.html")  // 读取到html文件（byte类型切片）
	if err != nil {
		w.Write([]byte(fmt.Sprintf("%v",err)))
	}
	w.Write(b)  // 返回响应数据（必须传入byte类型切片）
}

func f3(w http.ResponseWriter,r *http.Request){
	// 对于GET请求,参数都放在URL上(query param)，请求体中是没有数据的
	queryParam := r.URL.Query() // 自动帮我们识别URL中的urlParam
	query := queryParam.Get("query")
	page  := queryParam.Get("page")
	fmt.Println(query,page)
	fmt.Println(r.URL)     // 查看请求url
	fmt.Println(r.Method)  // 查看请求方法
	fmt.Println(ioutil.ReadAll(r.Body)) // 查看请求的body
	w.Write([]byte("ok"))
}


// post接口接收json数据
func f4(w http.ResponseWriter,r *http.Request){

	// 检查是否为POST请求
	if r.Method != "POST"{
		w.WriteHeader(405) // 返回错误代码
		return
	}
	body,_ := ioutil.ReadAll(r.Body)
	//body_str := string(body)
	//fmt.Println(body_str)

	var auth Auth
	var result Resp
	if err := json.Unmarshal(body,&auth);err == nil {
		// 拿到json数据
		fmt.Printf("用户名:%v 密码:%v",auth.Username,auth.Password)
		
		result.Code = "200"
		result.Msg = "Success"
		// 将返回的数据转化成json格式
		ret,_ := json.Marshal(result)
		w.Write(ret)
	}else{
		result.Code = "500"
		result.Msg = "Failed"
		ret,_ := json.Marshal(result)
		w.Write(ret)
	}
}

func main(){
	http.HandleFunc("/home",f1)
	http.HandleFunc("/index",f2)
	http.HandleFunc("/xxx",f3)
	http.HandleFunc("/login",f4)

	// 启动HTTP服务（监听地址和端口）
	http.ListenAndServe("0.0.0.0:9090",nil)
}
