%{
#include <stdio.h>
#include <string.h>
#include "y.tab.h"
 
int yywrap(void)
{
	return 1;
}
%}
%%
"+"	return ADD;
"-"	return SUB;
"*"	return MUL;
"/"	return DIV;
"\n"	return CHANGELINE;
"("	return LEFT;
")"	return RIGHT;
"="	return EQ;
([1-9][0-9]*)|0|([0-9]+\.[0-9]*) {
	double temp;
	sscanf (yytext, "%lf", &temp);
	yylval.var = temp;
	return NUMBER;
}
([a-zA-Z]+) {
	yylval.name = strdup(yytext);
	return NAME;
}
[ \t] ;
%%
