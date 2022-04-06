#include <stdio.h> 
#include <unistd.h> 
#include <stdlib.h> 
#include <pthread.h> 
#include <string.h> 
#include <semaphore.h> 


#define MAX_MSG_LEN 256 

sem_t sem1; 
sem_t sem2; 
int coin=0; 

void *thrdFun1(void *arg); 
void *thrdFun2(void *arg); 
void toggleCase(char *buf, int cnt); 

int main() 
{ 
    pthread_t thrd1; 
    char argmsg1[] = "Thread1: Waiting to deliver\n"; 
    int thNum; 
    int res; 
    int sem_val;
    res = sem_init(&sem1, 0,0);  
// res = sem_init(&sem2, 0,0);  

    res = pthread_create(&thrd1, NULL, thrdFun1, argmsg1);  

    while(1) 
    { 
    if (coin==0) 
     { 
     printf("no coin: please enter coin\n"); 
     scanf("%d",&coin); 
     } 
    else 
     { 
     sem_post(&sem1); 
  sleep(1); 
	 sem_getvalue(&sem1, &sem_val);
	 printf("sem_val=%d", sem_val);
     } 
    } 

    return 0; 
} 

void *thrdFun1(void *arg) 
{ 
    while(1) 
    { 
     printf("I'm %s\n",(char *)arg); 

    sem_wait(&sem1); 

    printf("Delivered...\n"); 
    coin=0; 
    sleep(5); 
    } 
} 
