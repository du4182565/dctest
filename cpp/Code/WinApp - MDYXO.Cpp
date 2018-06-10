//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]
#include <iostream>
using namespace std;
int main( )
{
   char ch[20];
   cout<<"enter a sentence:"<<endl;
   cin>>ch;
   cout<<"The string read with cin is:"<<ch<<endl;
   cin.getline(ch,20,'/');  //读个字符或遇'/'结束
   cout<<"The second part is:"<<ch<<endl;
   cin.getline(ch,20);  //读个字符或遇'/n'结束
   cout<<"The third part is:"<<ch<<endl;
   return 0;
}