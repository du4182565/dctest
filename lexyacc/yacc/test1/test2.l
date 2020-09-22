/* 第一段 */
%{
    int chars = 0;
    int words = 0;
    int lines = 0;
%}
 
/* 第二段 */ 
%%
[a-zA-Z]+  { words++; chars += strlen(yytext); }
\n         { chars++; lines++; }
.          { chars++; }
%%
 
/* 第三段 */ 
main(int argc, char **argv)
{
    yylex();
    printf("%8d%8d%8d\n", lines, words, chars);
}
