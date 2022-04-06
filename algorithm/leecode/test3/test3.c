#include<stdio.h>
#include<string.h>

int lengthOfLongestSubstring(char * s){
        if(NULL == s){
                return -1;
        }

        int i, left = 0, cnt= 0;
        int len = strlen(s);
        char *bk = s;
        char tmp[128] = {0};

        for(i = 0; i < len; i++)
        {
                if(tmp[s[i]] == 0)
                {
                        tmp[s[i]] = i + 1; 
		}
		else
		{
			if(tmp[s[i]] - 1 < left)
			{
				tmp[s[i]] = i + 1;
			}
			else if(tmp[s[i]] - 1 == left)
			{
				tmp[s[i]] = i + 1;
			        if((i - left) > cnt)
                                {
                                        cnt = i - left;
                                }
                                left = tmp[s[i]];	
			
			}
			else 
			{
				if((i - left) > cnt)
				{
					cnt = i - left;
				}
				left = tmp[s[i]];	 
			}
		}
	}

        if((i - left) > cnt)
        {
              cnt = i - left;
        }
	return cnt;
}

int main(){
	//char *val = "abcdefgdhigklmnopqrstuvw";
	//char *val = "abcabcbb";
	char *val = " ";
	int len = 0;

	len = lengthOfLongestSubstring(val);
	return 0;
}
