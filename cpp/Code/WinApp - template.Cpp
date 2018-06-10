//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include <iostream>
using namespace std;

template <typename Any>
Any Swap(Any &a, Any &b)
{
	Any temp;
	temp = a;
	a = b;
	b = temp;
}

template <typename Ch>
Ch max(Ch a, Ch b, Ch c)
{
	Ch max_num;
	max_num = a > b?a:b;
	max_num = max_num > c?max_num:c;

	return max_num;
}



int main(int argc, char *argv[])
{
	int i1,i2, i3, imax;
	cin >> i1 >> i2 >> i3;
	imax = max(i1,i2,i3);
	cout << "imax = " << imax <<endl;

	return 0;
}
