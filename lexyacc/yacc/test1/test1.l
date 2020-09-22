/*******************************************
* Name        : test.l
* Date        : Mar. 11, 2014
* Blog        : http://www.cnblogs.com/lucasysfeng/
* Description : lex进阶，循环扫描。
*******************************************/
 
%{
enum yytokentype
{
        ADD = 259,
        SUB = 260,
};
%}
 
myadd   "+"
mysub   "-"
myother .
 
%%
{myadd}    { return ADD; }
{mysub}    { return SUB; }
{myother}  { printf("Mystery character\n"); }
%%
 
main(int argc, char **argv)
{
        int tok;
 
        while (tok = yylex())
        {                           
            if (tok == ADD || tok == SUB)
            {
                printf("meet + or -\n");
            }
            else
            {
                printf("this else statement will not be printed, \
                   because if yylex return,the retrun value must be ADD or SUB.");
            }
        }
}
