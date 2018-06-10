//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include <iostream>
using namespace std;
template<typename T>
T max(T a, T b, T c){
	if(b > a) a = b;
	if(c > a) a = c;
	return a;
}

int main(int argc, char *argv[])
{
	int a, b, c, i_max;
	cin >> a >> b >> c;
	i_max = max(a, b, c);
	cout << "i_max =" << i_max;
	return 0;
}
