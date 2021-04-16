package uc
import "testing"
import "strings"

type ucTest struct {
    in, out string
}

func UpperCase(str string) string {

return strings.ToUpper(str)}

var ucTests = []ucTest{
    ucTest{"abc", "ABC"},
    ucTest{"cvo-az", "CVO-AZ"},
    ucTest{"Antwerp", "ANTWERP"},
}

func TestUC(t *testing.T) {
    for _, ut := range ucTests {
        uc := UpperCase(ut.in)
        if uc != ut.out {
            t.Errorf("uppercase(%s) = %s,must be %s", ut.in, uc, ut.out)
        }
    }
}
