package main
 
import (
	"cycle/package_a"
	"cycle/package_b"
)
 
func main() {
	a := new(package_a.PackageA)
	b := new(package_b.PackageB)
        a.B = b
        b.A = a
	a.PrintAll()
	b.PrintAll()
}
