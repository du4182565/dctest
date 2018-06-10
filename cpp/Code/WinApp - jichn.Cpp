//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include <iostream>

using namespace std;

class Anmal{
protected:
private:
public:
	Anmal();
	~Anmal();
};

Anmal::Anmal(){
	cout << "its just a anmal....." << endl;
}

class Pig: public Anmal{
protected:
	int age;
	float weight;
	char* name;
	char* voice;
private:


public:
	Pig();
	Pig(int, float, char*, char*);
	void get_voice();
	void get_name();
	~Pig();
};
Pig::Pig(){}

Pig::Pig(int p_age, float p_weight, char *p_name, char* p_voice) : age(p_age), weight(p_weight), name(p_name), voice(p_voice){
	cout << "init pig" << endl;
}

void Pig::get_voice(){
	cout << "hengheng: " << voice << endl;
}

void Pig::get_name(){
	cout << "zhu" << name << endl;
}

class BlackPig : public Pig{
protected:
private:
	char *food;
public:
	BlackPig();
	BlackPig(int, float, char*, char*, char*);
	void get_voice();
	void get_name();
	~BlackPig();
};
BlackPig::BlackPig(int p_age, float p_weight, char *p_name, char* p_voice, char *food) :Pig(p_age, p_weight, p_name, p_voice), food(food){
	cout << "food is" << food << endl;
}

void BlackPig::get_voice(){
	cout << "Blackpig voice is" << voice << endl;
}

void BlackPig::get_name(){
	cout << "Blackpig name is" << name << endl;
}


class Sheep :public Anmal{
public:
	Sheep();
	Sheep(int, float, char*, char*);
	~Sheep();
	void get_name();
	void get_num();

private:

protected:
	int num;
	float weight;
	char * name;
	char * voice;
};
Sheep::Sheep(){}
Sheep::Sheep(int s_num, float s_weight, char* s_name, char* s_voice) :num(s_num), weight(s_weight), name(s_name), voice(s_voice){
	cout << "a new sheep born" << endl;

}

void Sheep::get_name(){
	cout << "sheep named is" << name << endl;
}

void Sheep::get_num(){
	cout << "Sheep num is " << num << endl;
}


class WhiteSheep : public Sheep{
public:
	WhiteSheep();
	WhiteSheep(int, float, char*, char*, char *);
	void get_name();
	void get_num();
	~WhiteSheep();
protected:
private:
	char * color;
};

WhiteSheep::WhiteSheep(){}
WhiteSheep::WhiteSheep(int num, float weight, char* name, char* voice, char *color):Sheep(num, weight, name, voice), color(color){
	cout << "WhiteSheep  is born" << endl;
		cout << "color is" << color << endl;
}

void WhiteSheep::get_name(){
	cout << "name is " << name << endl;
}

void WhiteSheep::get_num(){
	cout << "whitesheep voice is " << voice << endl;
}



int main(int argc, char *argv[])
{
	WhiteSheep	lala(10, 103.2, "lala", "mianmian", "white");
	BlackPig	bobo(11, 132.3, "bobo", "henghengda", "sheit");

	return 0;
}