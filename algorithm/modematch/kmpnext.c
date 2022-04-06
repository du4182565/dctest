#include<stdio.h>
#include<string.h>
#include<stdlib.h>

void get_nextval(char const* ptrn, int plen, int* nextval)
{
    int i = 0;
    nextval[i] = -1;
    int j = -1;
    while( i < plen-1 )
    {
        if( j == -1 || ptrn[i] == ptrn[j] )   //循环的if部分
        {
            ++i;
            ++j;
            //修正的地方就发生下面这4行
            if( ptrn[i] != ptrn[j] ) //++i，++j之后，再次判断ptrn[i]与ptrn[j]的关系
                nextval[i] = j;      //之前的错误解法就在于整个判断只有这一句。
            else
                nextval[i] = nextval[j];
        }
        else                                 //循环的else部分
            j = nextval[j];
    }
}

int main(){
	int  next[200] = {0};	
	char s[200] = {0};
	int i = 10,j;
	int len = 0;
	while(i--)
	{
		gets(s);
		len = strlen(s);
		get_nextval(s, len, next);
		memset(s, 0, sizeof(s));
		for(j = 0; j < len; j++)
		{
		   printf("%d,", next[j]);
		}
		memset(next,0, sizeof(next));
		len = 0;
		printf("\n");
	}
        return 0;
}
