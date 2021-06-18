package main

import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    dsn := "root:2359780dc@tcp(127.0.0.1:3306)/test"
    db, err := sql.Open("mysql", dsn)  
    if err != nil {
        panic(err)
    }
    defer db.Close()
}
