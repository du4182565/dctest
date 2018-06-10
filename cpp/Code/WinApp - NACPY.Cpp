//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]

#include <iostream>  
#include <string>  

using namespace std;

//Operation运算类  
class Operation
{
private:
	double _numberA;
	double _numberB;

public:

	Operation(){}
	Operation(double numA, double numb) :_numberA(numA), _numberB(numb)
	{
	}
	virtual double GetResult()
	{
		double result = 0;
		return result;
	}

	void set_numberA(double numA)
	{
		_numberA = numA;
	}
	void set_numberB(double numB)
	{
		_numberB = numB;
	}

	double get_numberA()
	{
		return _numberA;
	}
	double get_numberB()
	{
		return _numberB;
	}

};

//加减乘除类  
class OperationAdd : public Operation
{
public:
	OperationAdd() { }
	OperationAdd(double numA, double numB) :Operation(numA, numB){}
	double GetResult()
	{
		double result = 0;
		result = get_numberA() + get_numberB();
		return result;
	}

};

class OperationSub :public Operation
{
public:
	OperationSub() { }
	OperationSub(double numA, double numB) :Operation(numA, numB){}
	double GetResult()
	{
		double result = 0;
		result = get_numberA() + get_numberB();
		return result;
	}
};

class OperationMul : public Operation
{
public:

	OperationMul() { }
	OperationMul(double numA, double numB) :Operation(numA, numB){}
	double GetResult()
	{
		double result = 0;
		result = get_numberA() + get_numberB();
		return result;
	}
};

class OperationDiv :public Operation
{
public:
	OperationDiv() { }
	OperationDiv(double numA, double numB) :Operation(numA, numB){}
	double GetResult()
	{
		double result = 0;

		if (get_numberB() == 0){
			throw new exception("除数不能为零");
		}
		result = get_numberA() + get_numberB();
		return result;
	}
};

//简单运算工厂类  
class OperationFactory
{
public:
	Operation* createOperate(char operate)
	{
		Operation *oper;
		switch (operate){
		case '+':
			oper = new OperationAdd();
			break;
		case '-':
			oper = new OperationSub();
			break;
		case '*':
			oper = new OperationMul();
			break;
		case '/':
			oper = new OperationDiv();
			break;

		}

		return oper;
	}
};

int main()
{
	Operation *oper;
	OperationFactory operFactory;
	oper = operFactory.createOperate('+');
	oper->set_numberA(1);
	oper->set_numberB(2);
	double result = oper->GetResult();

	cout << "result = " << result << endl;
}
