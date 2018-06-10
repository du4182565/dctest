//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include <iostream>
using namespace std;
template<typename T1, typename T2>
class Point{
	private:
		T1 x;
		T2 y;

	public:
		Point(T1 _x, T2 _y): x(_x), y(_y){}
		void setX(T1 x);
		void setY(T2 y);
		T1   getX();
		T2	  getY();
};

template<typename T1, typename T2>
void Point<T1, T2>::setX(T1 x){
	this->x = x;
}

template<typename T1, typename T2>
void Point<T1, T2>::setY(T2 y){
		this->y = y;
}

template<typename T1, typename T2>
T1 Point<T1, T2>::getX(){
	return x;
}

template<typename T1, typename T2>
T2 Point<T1, T2>::getY(){
	return y;
}


int main(int argc, char *argv[])
{
	Point<int, int> p1(10, 20);
	cout << "p1.x" << p1.getX() << "p1.y" << p1.getY() <<endl;
	
	Point<float, char*> p2(1.235, "abcd");
	cout << "p2.x" << p2.getX() << "p2.Y" << p2.getY() << endl;\
}
