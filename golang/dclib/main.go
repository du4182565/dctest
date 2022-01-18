package main

import(
    "./util"
    "fmt"
)

type User struct {
    Email     string
    Password  string
    Name      sql.NullString
    Gender    string
    Role      Role
    Addresses []Address
    Active     bool
}

func tesinterfaceutil(value interface{}){
	name = utils.HumanizeString(utils.ModelType(value).Name())
	return
}


func main(){
   tesinterfaceutil(&User{}) 
}
