//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include <iostream>
using namespace std;

class Base
{
	public:
		Base(int);
		virtual ~Base(void);

		int getIBase() const;
		static int instanceCount();
		virtual void print() const;

	protected:
		int iBase;
		static int count;
}

void test_base_mode1()
{
	Base b1(1000);
	count << "对象b1的起始内存地址："  << &b1 << endl;
	count << "type_info信息：" << ()

}

int main(int argc, char *argv[])
{
	int num = 0;
	cout<<"你好,QStudio ! 请输入一个数字!"<<endl;
	cin>>num;
	cout<<num<<endl; 
	return 0;
}
