/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
#include<stdio.h>
#include<stdlib.h>
#include<string.h> 

#define HASH_LEN 60
typedef struct map_s{
    int index;
    int value;
    struct map_s *next;
}map_s;
map_s *hash_table[HASH_LEN];

int g_target;

int detory_table(){
    int i = 0;
    map_s *node = NULL;
    map_s *node_tmp = NULL;
    for(i ; i < HASH_LEN; i++)
    {
        if(hash_table[i])
        {
            node = hash_table[i];
            while(node){
                node_tmp = node->next;
                free(node);
                node = node_tmp;
            }
        }
    }
    return 0;
}

int AddHash(map_s *num){
    if(NULL == num){
        return -1;
    }
    map_s *node = NULL;
    map_s *t_node = NULL;
    int t_index = 0;
    t_index = num->value%HASH_LEN;
    node = malloc(sizeof(struct map_s));
    if(node == NULL)
    {
        return -1;
    }
    memcpy(node, num, sizeof(struct map_s));
    if(hash_table[t_index])
    {
        t_node = hash_table[t_index];
        while(t_node)
        {
            if(t_node->next == NULL)
            {
                t_node->next = node;
            }
        }
    }
    else
    {
        hash_table[t_index] = node;
    }
    return 0;
}
int FindHash(map_s *num){
    if(NULL == num)
    {
        return -1;
    }
    map_s *node = NULL;
    map_s *t_node = NULL;
    int t_index = 0;
    int find_num = g_target - num->value;
    t_index = find_num%HASH_LEN;
    t_node = hash_table[t_index];
    
    while(t_node){
        if(t_node->value == find_num)
        {
            return t_node->index;
        }
    }
    return -1;
}

int* twoSum(int* nums, int numsSize, int target, int* returnSize){
     if(NULL == nums || NULL == returnSize || numsSize > 32725)
     {
            return NULL;
     }
     int i = 0;
     map_s node;
     g_target = target;
     int returnnum = 0;
     int *returnvalue = malloc(sizeof(int)*2);
     for(i = 0; i < numsSize; i++)
     {
        if(target >= nums[i])
        {
            node.index = i;
            node.value = nums[i];
	    node.next = NULL;
            returnnum = FindHash(&node);
            if(-1 != returnnum)
            {
                returnvalue[0] = returnnum;
                returnvalue[1] = i;
                detory_table();
                *returnSize = 2;
                return returnvalue; 
            }
            AddHash(&node);
        }
     }
     detory_table();
     return NULL;
}
#define SIZELEN  100000

int main()
{
	int a[SIZELEN];
	int b[SIZELEN];
	int resize = 0;
	int *bb = NULL;
	int i,aa;
	srand(time(NULL));
	for(i = 0; i < SIZELEN; i++)
	{
		a[i] = rand()%278;
		srand(a[i]);
		b[i] = rand()%523;
		srand(b[i]);
		printf("a: %d b:%d |",a[i], b[i]);
	}
	//bb = twoSum(a, 4, 26, &resize);
	return 0;
}
