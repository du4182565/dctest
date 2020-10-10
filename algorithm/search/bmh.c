#include<stdio.h>
#include<string.h>

int init_badword_new (unsigned char * dst_str, unsigned int  dst_len, unsigned char *dirctory)
{
	if (NULL == dst_str || 0 == dst_len || NULL == dirctory)
		return 0;
	
	unsigned char tmp = 0;
	int i ;
	for(i = 0; i < dst_len - 1; i++)
	{
		tmp = dst_str[i];
		dirctory[tmp] = dst_len - i - 1;				
	}
	return 0;
}

unsigned char *bmh_find_string_new (unsigned char * dst_str, unsigned char * sub_str, unsigned int  dst_len, unsigned int  sub_len, unsigned char *dirctory)
{
	if (NULL == dst_str || NULL == sub_str || 0 == sub_len || sub_len > 255
		|| 0 == dst_len)
		return NULL;
		
	unsigned char *dst_ptr = dst_str;
	unsigned char byte_tmp = 0;
	byte_tmp = dst_str[0];
	if(0 == dirctory[byte_tmp])
	{
		return NULL;
	}
	
	int j = 0;
	int i = 0;
	
	while (i + sub_len < dst_len + 1)
	{
		for(j = sub_len - 1; j >= 0; j--)
		{
			if(dst_str[i + j] != sub_str[j])
			{
				break;
			}
		}
		
		if(j < 0)
		{
			return dst_str + i;
		}
		
		byte_tmp = dst_str[i + j];
		if(dirctory[byte_tmp])
		{
			i = i + dirctory[byte_tmp];
		}
		else
		{
			i++;
		}
	}
	
	return NULL;
}

/*
unsigned char *bmh_find_string_new (unsigned char * dst_str, unsigned char * sub_str, unsigned int  dst_len, unsigned int  sub_len, unsigned char *dirctory)
{
	if (NULL == dst_str || NULL == sub_str || 0 == sub_len || sub_len > 255
		|| 0 == dst_len || dst_len < sub_len)
		return NULL;
		
	unsigned char *dst_ptr = dst_str;
	unsigned char *end_ptr = dst_ptr + dst_len;	
	unsigned char byte_tmp = 0;
	byte_tmp = dst_str[0];
	int i = 0;
	
	if(0 == dirctory[byte_tmp])
	{
		return NULL;
	}
	
	while (dst_ptr + sub_len < end_ptr)
	{
		if(*(dst_ptr + sub_len - 1) != *(sub_str + sub_len - 1))
		{	
			byte_tmp = *(dst_ptr + i);
			if(dirctory[byte_tmp])
			{
				dst_ptr = dst_ptr + dirctory[byte_tmp];
			}
			else
			{
				dst_ptr = dst_ptr + dst_len;
			}
			continue;
		}
		if(sub_len == 1)
		{
			return dst_ptr;
		}
		
		for (i = sub_len - 2; i >= 0 && i < 254; i--)
		{
			if (*(dst_ptr + i) != *(sub_str + i))
			{
				dst_ptr = dst_ptr + 1;
				continue;
			}
		}
		
		if (i < 0)
			return dst_ptr;
	}
	
	return NULL;
}
*/
int main(int argc, char **argv)
{
	unsigned char *ptr = NULL;
	char dictory[256] = {0};
	init_badword_new(argv[1], strlen(argv[1]), dictory);
	ptr = bmh_find_string_new (argv[2], argv[1], strlen(argv[2]), strlen(argv[1]), dictory);
	
	printf("%s\n", ptr);
	return 0;
}


