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
    t_node = hash_table[t_index];
    hash_table[t_index] = node;
    node->next = t_node;	
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
	t_node = t_node->next;
    }
    return -1;
}
int FindGoalHash(int goal){
    map_s *t_node = NULL;
    int t_index = goal%HASH_LEN;
    t_node = hash_table[t_index];
    
    while(t_node){
        if(t_node->value == goal)
        {
            return t_node->index;
        }
	t_node = t_node->next;
    }
    return -1;
}
#define SIZELEN  100000
int FindValue(int goal, int *reson){
	int i, findvalue, goal_other_index;
    map_s *node = NULL;
	
	for(i = 0; i < HASH_LEN; i++)
	{
		node = hash_table[i];
		while(node)
		{
			if(goal > node->value)
			{
				findvalue = goal - node->value;
				goal_other_index = FindGoalHash(findvalue);
				if(-1 != goal_other_index)
				{
					reson[0] = goal_other_index;
					reson[1] = node->index;
					return 0;
				}
			}
			node = node->next;
		}
	}
}
/*
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
*/


int main()
{
	int a[SIZELEN];
	int b[SIZELEN];
	int resize = 0;
	int *bb = NULL;
	int i,aa, one, two;
	int succ = 0;
	int reson[2] = {0};
	srand(time(NULL));
	map_s node, findcal;
	memset(&node,0, sizeof(node));
	clock_t start, stop;
	double duration;
	
	for(i = 0; i < SIZELEN; i++)
	{
		a[i] = rand()%278;
		srand(a[i]);
		node.index = i;
		node.value = a[i];
		AddHash(&node);
		b[i] = rand()%523;
		srand(b[i]);
	}
	start = clock();
	for(i = 0; i < SIZELEN; i++)
	{
		memset(reson, 0, sizeof(reson));
		if(-1 !=  FindValue(b[i], reson)){
			one = reson[1];
			two = reson[0];
			if(a[one] + a[two] == b[i])
			{
				succ++;
			}
		}
	}
	stop = clock();
	duration = ((double)(stop - start));
	printf("succ num is %d. time used %f", succ, duration);
	//bb = twoSum(a, 4, 26, &resize);
	return 0;
}
