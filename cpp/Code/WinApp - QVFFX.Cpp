//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]


#include <iostream>
using namespace std;

class Base {
   public:
      virtual void f() { cout << "Base::f" << endl; }
      virtual void g() { cout << "Base::g" << endl; }
      virtual void h() { cout << "Base::h" << endl; }
 
};

class Base1: public Base{
	public:
      virtual void f() { cout << "Base::f1" << endl; }
      virtual void g1() { cout << "Base::g1" << endl; }
      virtual void h1() { cout << "Base::h1" << endl; }
};

typedef void(*Fun)(void);

int main(int argc, char *argv[])
{
   Base b;        
	Fun pFun = NULL;

	Base1 b1;        
   cout << "虚函数表地址：" << (int*)(&b) << endl;
   cout << "虚函数表 — 第一个函数地址：" << (int*)*(int*)(&b) + 1 << endl;

   cout << "虚函数表地址：" << (int*)(&b1) << endl;
   cout << "虚函数表 — 第一个函数地址：" << (int*)*(int*)(&b1) << endl;
 
   // Invoke the first virtual function 
   pFun = (Fun)*((int*)*(int*)(&b));
	cout << pFun << endl;
   pFun();
	pFun = NULL;
   pFun = (Fun)*((int*)*(int*)(&b) + 1);
   pFun();	
   pFun = (Fun)*((int*)*(int*)(&b) + 2);
   pFun();

   pFun = (Fun)*((int*)*(int*)(&b1));
   pFun();
   pFun = (Fun)*((int*)*(int*)(&b1) + 1);
   pFun();
   pFun = (Fun)*((int*)*(int*)(&b1) + 2);
   pFun();
   pFun = (Fun)*((int*)*(int*)(&b1) + 3);
   pFun();
   pFun = (Fun)*((int*)*(int*)(&b1) + 4);
   pFun();
   pFun = (Fun)*((int*)*(int*)(&b1) + 5);
   pFun();

return 0;
}
