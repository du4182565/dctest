//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include<iostream>
using namespace std;

//基类
class People{
protected:
    char *name;
    int age;
public:
    People(char*, int);
};

People::People(char *name, int age): name(name), age(age){}

//派生类
class Student: public People{
private:
    float score;
public:
    Student(char*, int, float);
    void display();
};
//调用了基类的构造函数
Student::Student(char *name, int age, float score): People(name, age){
    this->score = score;
}
void Student::display(){
    cout<<name<<"的年龄是"<<age<<"，成绩是"<<score<<endl;
}

int main(){
	 People p1("lilei",20);
    Student stu("小明", 16, 90.5);
    stu.display();
	 cout << "p1 addr:" << &p1 << endl;
	 cout << "stu addr" << &stu << endl;

    return 0;
}