#include<stdio.h>
using namespace std;
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
    	CChild *father = new CFather;
    	father->show();
    	return 0;
}