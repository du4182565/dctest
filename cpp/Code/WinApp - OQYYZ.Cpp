//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]


class Student{
	private:
		char name;
		int  age;
		float score;
	
	public:
		Student();
		Student(char *, int, float);
		void setname(char *);
		void setage(int);
		void setscore(float);
		void say();
}
Student::Student(){}
Student::Student(char *name1, int age1,float score1){
	name = name1;
	age = age1;
	score = score1;
}
void Student::setname(char *name1)
{
	name = name1;
}
void Student::setagear *name1)
{
	name = name1;
}
void Student::setname(char *name1)
{
	name = name1;
}



#include <iostream>
using namespace std;
int main(int argc, char *argv[])
{
	int num = 0;
	cout<<"你好,QStudio ! 请输入一个数字!"<<endl;
	cin>>num;
	cout<<num<<endl; 
	return 0;
}
