//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include<stdio.h>
class CFather
{
    public:
    	CFather(){};
    	void show()
    	{
    	    	printf("this is father class\n");
    	}
};
class CChild:public CFather
{
    public:
    	CChild(){};
    	void show()
    	{
        		printf("this is child class\n");
    	}
};
int main()
{
    	CChild child;
    	child.show();
    	return 0;
}   return 0;
}
