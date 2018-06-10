//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include<iostream>
using namespace std;


class CashSuper{
public:
	virtual double acceptCash(double money);
};


class CashNormal :public CashSuper{
public:
	double acceptCash(double money){ return money; }
};

class CashRebate :public CashSuper{
private:
	double moneyRebate;
public:
	CashRebate(double moneyRebate) :moneyRebate(moneyRebate){}
	double acceptCash(double money){ return money * moneyRebate; }
};

class CashReturn :public CashSuper{
private:
	double moneyReturn;
	double moneyCondition;
public:
	CashReturn(double Condition, double moneyReturn) : moneyReturn(moneyReturn), moneyCondition(Condition){}
	double acceptcash(double money);
};

/*
class CashFatory:public CashSuper{
public:
	CashSuper *CashCreate(string type);
private:
	CashSuper *ca;
};
*/

double CashReturn::acceptcash(double money)
{
	double result = 0;
	if (money > moneyCondition)
	{
		result = money - moneyCondition;
	}
	else
	{
		result = money;
	}

	return   result;
}
class Context
{
private:
	CashSuper *cash;
public:
	Context(CashSuper *cash)
	{
		this->cash = cash;
	}
	void ContextInterface(double money)
	{
		cout << cash->acceptCash(money) << endl;
	}
};
int main()
{

	Context *context;
	context = new Context(new CashRebate(0.8));
	context->ContextInterface(100);


	return 0;
}