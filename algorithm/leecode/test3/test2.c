#include<stdio.h>
#include<string.h>

int lengthOfLongestSubstring(char * s){
    int sLen = strlen(s);
    int left=0, left_bk = 0, res=0, cnt=0;
    int tmp[128] = {0};
    int i,j = 0;

    for(i=0; i<sLen; ++i){
        if(0 == tmp[s[i]]){
            tmp[s[i]]=++cnt;
        }
        else{
            if(cnt > res)
            {
                res = cnt;
            }
            cnt = 0;
			left_bk = tmp[s[i]];
            for(j = left; j < tmp[s[i]] + left; j++)
            {
                tmp[s[j]] = 0;
            }
            left = left + left_bk;
            for(j = left; j < i + 1; j++, cnt++)
            {
                tmp[s[j]] = cnt + 1;
            }
        }
    }
    if(cnt > res)
    {
       res = cnt;
    }
    return res;
}

int main(){
	char *val = "abcdefgdhigklmnopqrstuvw";
	int len = 0;

	len = lengthOfLongestSubstring(val);
	return 0;
}
