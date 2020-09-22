%{
#include <stdio.h>
#include <string.h>
int yylex();
int yyerror(char*);
int count = 0;
char* str[100];
double value[100];
%}
%union
{
	double var;
	char* name;
}
%token <var> NUMBER
%token <name> NAME
%token ADD SUB MUL DIV CHANGELINE LEFT RIGHT EQ
%type <var> term exp factor
%%
lines:
     	line
	|lines line;
line:
    	CHANGELINE
	|exp CHANGELINE
	{
		printf(">>  %f\n", $1);
	}
      	|NAME EQ exp CHANGELINE
	{
		int i = 0;
		int flag = 1;
		for (i = 0; i < count; ++i)
			if (strcmp($1, str[i]) == 0)
			{
				value[i] = $3;
				flag = 0;
				break;
			}
		if (flag)
		{
			str[count] =(char*) $1;
			value[count] = $3;
			count++;
			printf("new variable added\n");
		}
	}
 
exp:
	term
    	|exp ADD term
	{
		$$ = $1 + $3;
	}
	|exp SUB term
	{
		$$ = $1 - $3;
	}
term:
   	factor
	|term MUL factor
	{
		$$ = $1 * $3;
	}
	|term DIV factor
	{
		$$ = $1 / $3;
	}
factor:
      	NUMBER
	|LEFT exp RIGHT 
	{
		$$ = $2;
	}
	|NAME
	{
		int i = 0;
		int flag = 1;
		for (i = 0; i < count; ++i)
		{
			if (strcmp($1, str[i]) == 0)
			{
				$$ = value[i];
				flag = 0;
				break;
			}
 
		}
		if(flag)
			printf("no this variable\n");
		
	}
%%
int main()
{	
	printf("support use variable\ninput ctrl+d to exit\n");
	extern int yyparse(void);
	yyparse();
	return 0;
}
int yyerror(char* msg)
{
	printf("error:%s\n", msg);
}
 
 