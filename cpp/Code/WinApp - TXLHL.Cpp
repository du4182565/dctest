//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]
#include<iostream>

using namespace std;

class test 
{ 
public: 
	test(int i){ m_i=i;} 
	test(){}; 
	void hello() 
	{ 
	printf("hello/n"); 
	} 
private: 
	int m_i; 
};

class test1 
{ 
public: 
	test1(int i){ m_i=i;} 
	test1(){}; 
	void hello() 
	{ 
	printf("hello1/n"); 
	} 
private: 
	int m_i; 
};
int main() 
{ 
 test1 *p=new test(); 
 p->hello(); 
 p=NULL; 
 p->hello(); 
}