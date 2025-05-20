#include <stdio.h>
#include <stdlib.h>
static void before(void) __attribute__((constructor));
static void after(void) __attribute__((destructor));
static void before()
{
	       printf("before main\n");
}
static void after(void)

{
	       printf("after main\n");
}
 
int add()
{
	       printf("addn\n");
	               return 0;
}
