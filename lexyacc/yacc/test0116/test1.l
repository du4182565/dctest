%{
 
/*
  sample example.
*/
int
yywrap(void)
{
    return 1;
}
%}
%%
 
[/t ]+  /*ignore white space*/;
is |
am |
did |
go {printf("%s: is a verb\n",yytext);}
[a-zA-Z]+  {printf("%s: is not a verb\n",yytext);}
 
.|\n {ECHO;}
%%
main()
{
  yylex();
}