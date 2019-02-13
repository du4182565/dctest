/*************************************************************************
	> File Name: test_main.c
	> Author: 
	> Mail: 
	> Created Time: Tue 12 Feb 2019 08:28:57 PM PST
 ************************************************************************/

#include<stdio.h>
#include"base_op.h"

int main()
{
    unsigned int pi32[2] = {0x76543210, 0xfedcba98};
    unsigned int a =_getB(pi32, 3 ,unsigned int);

    return 0;
}

