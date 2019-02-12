/*************************************************************************
	> File Name: test_main.c
	> Author: 
	> Mail: 
	> Created Time: Mon 11 Feb 2019 11:01:12 PM PST
 ************************************************************************/

#include<stdio.h>
#include"param.h"
#include"jx_types.h"

int main(int argc, char *argv[])
{
    _XXX a[16];
    _DEFNODE b;
    _DEFVALNODE c;
    
    _I aa = __offset(_vn,_DEFVALNODE);

    return chk_param(argc, argv);
}
