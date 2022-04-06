#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

#define CUSTOMER_NUM 10
pthread_mutex_t mutex_x= PTHREAD_MUTEX_INITIALIZER;
sem_t sem;
int sem_val = 0;
int iRet;
void * get_service(void *thread_id){

    int customer_id = *((int *)thread_id);
    sem_getvalue(&sem, &sem_val);
    printf("custom_id:%d .bedore_wait_--semval %d.\n", customer_id,sem_val+1);

    if(sem_wait(&sem) == 0) {

        sem_getvalue(&sem, &sem_val);
        //printf("\n");

        printf("%d号.......可用窗口 --%d ...\n",customer_id, sem_val+1);

         iRet=pthread_mutex_trylock(&mutex_x);
        if(iRet==EBUSY){
            printf ("窗口被占用 请更换服务窗口.\n");
        }else if(iRet==0) {
            printf("customer %d receive service  ...\n", customer_id);
            sleep(5); /* service time: 100ms */
            printf("customer %d receive service  over\n", customer_id);
            pthread_mutex_unlock(&mutex_x);

        }
        sem_post(&sem);
    }
}
int main(int argc, char *argv[]){

    sem_init(&sem,0,1);

    pthread_t customers[CUSTOMER_NUM];
    int i, iRet;

    for(i = 0; i < CUSTOMER_NUM; i++){
        int customer_id = i;
        iRet = pthread_create(&customers[i], NULL, get_service, &customer_id);
        if(iRet){
            perror("pthread_create");
            return iRet;
        }
        else{
            printf("Customer %d arrived.\n", i);
        }
        usleep(200);
    }

    int j;
    for(j = 0; j < CUSTOMER_NUM; j++) {
        pthread_join(customers[j], NULL);
    }

    sem_destroy(&sem);
    return 0;
}
