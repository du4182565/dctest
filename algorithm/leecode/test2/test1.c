/*
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
 
struct ListNode {
     int val;
     struct ListNode *next;
};

int carry_flag;
 struct ListNode* NewListNode(int value){
    struct ListNode* node =  (struct ListNode *)malloc(sizeof(struct ListNode));
    if(node){
        memset(node, 0, sizeof(struct ListNode));
        node->val = value;
    }
    return node;
}

struct ListNode* calcfunc(struct ListNode* l1, struct ListNode* l2)
{
    int solution = 0;   
    int carry_flag = 0;
    int value = 0;
    struct ListNode* node = NULL;     
    if(l1 && l2)
    {
        solution =  l1->val + l2->val + carry_flag;
    }else if(!l1 && l2){
        solution =  l2->val + carry_flag;
    }else if(l1 && !l2){
        solution =  l1->val + carry_flag;
    }
    carry_flag = 0;
    carry_flag = solution / 10;
    value = solution % 10;
    node = NewListNode(value);
    return node;
}

struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2){
    if(l1 == NULL || l2 == NULL){
        return NULL;
    }
    struct ListNode* p1 = l1;
    struct ListNode* p2 = l2;

    struct ListNode* head = NULL;
    struct ListNode* node = NULL;
    struct ListNode* nodetmp = NULL;
    while(p1 || p2){
        
        nodetmp = calcfunc(p1,p2);
        if(NULL == nodetmp)
        {
            return NULL;
        }
        if(head)
        {
            node->next = nodetmp;
            node = node->next;
        }else{
            head = nodetmp;
            node = nodetmp;
        }
            p1 = p1->next;
            p2 = p2->next;
    }
    if(carry_flag)
    {
        node->next = NewListNode(1);
    }
    return head;
}

int main()
{
	int a1[] = {2,4,3};
	int a2[] = {5,6,4};
	int i = 0;
	struct ListNode* l1 = NULL;
	struct ListNode* l2 = NULL;
	struct ListNode* p1 = NULL;
	struct ListNode* p2 = NULL;	
	struct ListNode* node1 = NULL;
	struct ListNode* node2 = NULL;
	struct ListNode* solution = NULL;
	for(i = 0; i < 3; i++){
		p1 = NewListNode(a1[i]);
		p2 = NewListNode(a2[i]);
		if(l1){
			node1->next = p1;
			node1 = node1->next;
		}
		else{
			l1 = p1;
			node1 = p1;
		}
		if(l2){
			node2->next = p2;
			node2 = node2->next;
		}
		else{
			l2 = p2;
			node2 = p2;		
		}
			
	}
	solution = addTwoNumbers(l1, l2);
	return 0;
}

