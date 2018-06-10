//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include<iostream>
#include<iomanip>


using namespace std;

class Watch{
private:
	int sec;
	int min;
public:
	Watch() :sec(0), min(0){}
	void setzero(){ sec = 0; min = 0; }
	Watch run();
	Watch operator++();
	Watch operator++(int);
	friend ostream & operator<<(ostream &, const Watch &);
};


Watch Watch::run(){
	sec++;
	if (sec == 60)
	{
		sec = 0;
		min++;
	}
	return *this;
}

Watch Watch::operator++(){
	return	run();
}

Watch Watch::operator++(int n){
	Watch a = *this;
	run();
	return a;
}

ostream & operator<<(ostream & out, const Watch &s){
	out << setfill(0) << setw(2) << s.min << ":" << setw(2) << s.sec;
		return out;
}


int main()
{
	Watch a1, a2;
	a1 = a2++;
	cout << "s1: " << a1 << endl;
	cout << "s2: " << a2 << endl;

	a1 = ++a2;
	cout << "s1: " << a1 << endl;
	cout << "s1; " << a2 << endl;

	return 0;
}