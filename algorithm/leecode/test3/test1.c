#include<stdio.h>
#include<string.h>

int lengthOfLongestSubstring(char * s){
    int sLen = strlen(s);
    int left=0, res=0, cnt=0;
    int tmp[128] = {0};
    int i = 0;    
    for(i=0; i<sLen; ++i){
        if(0 == tmp[s[i]]){
            tmp[s[i]]=1;
            cnt++;
            if(cnt>res){
                res = cnt;
            }
        }
        else{
            tmp[ s[left++] ] = 0;
            cnt--;
            i--;
        }
    }
    return res;
}

int main(){
	char *val = "abcdefgdhigklmnopq";
	int len = 0;

	len = lengthOfLongestSubstring(val);
	return 0;
}
