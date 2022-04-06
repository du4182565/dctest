#include <stdio.h>
#include <semaphore.h>
#include <pthread.h>
#include <unistd.h>

sem_t sem;

void* func1(void *arg)
{
   sem_wait(&sem);
   int *running = arg;
   printf("thread1 running\n");
   printf("arg=%d\n",*running);
}

void* func2(void *arg)
{
   printf("thread2 running\n");
   sem_post(&sem);
}

int main()
{
   sem_init(&sem,0,0);
   pthread_t thread[2];
   int a = 5;
   pthread_create(&(thread[0]),NULL,(void*)func1,(void*)&a);
   printf("create thread1 success\n");

   sleep(10);
   pthread_create(&(thread[1]),NULL,(void*)func2,(void*)&a);
   printf("create thread2 success\n");

   pthread_join(thread[0],NULL);
   pthread_join(thread[1],NULL);
   sem_destroy(&sem);

   return 0;
}
