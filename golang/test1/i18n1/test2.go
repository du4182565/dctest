package main

import (
  "github.com/jinzhu/gorm"
  "github.com/qor/i18n"
)

func main() {
  db, _ := gorm.Open("mysql", "user:password@/dbname?charset=utf8&parseTime=True&loc=Local")

  I18n := i18n.New(
    database.New(&db), // load translations from the database
    yaml.New(filepath.Join(config.Root, "config/locales")), // load translations from the YAML files in directory `config/locales`
  )

  I18n.T("en-US", "demo.greeting") // Not exist at first
  I18n.T("en-US", "demo.hello") // Exists in the yml file

  i18n.Default = "zh-CN" // change the default locale. the original value is "en-US"
}
