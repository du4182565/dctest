//MSCompiler Driver By QStudio - Start
//TODO:在这里添加预编译参数

//MSCompiler Driver By QStudio - End
//查看预编译参数使用方法请点击 菜单->构建 [B]->编译帮助 [H]
#include<iostream>

using namespace std;
class CMyString
{
public:
	CMyString(char* pData = NULL);
	CMyString(const CMyString &str);
	~CMyString(void);

	CMyString &operator=(const CMyString &str);
private:
	char *m_pData;
	int len;
};

CMyString::CMyString(char *pData)
{
	if (NULL == pData)
	{
		m_pData = NULL;
		len = 0;
	}
	else
	{
		len = strlen(pData);
		m_pData = (char *)malloc(sizeof(char)* (len + 1));
		if (m_pData == NULL)
		{
			cout << "CMyString  fail";
		}
		memset(m_pData, 0, (len + 1));
		strncpy(m_pData, pData, len);
		cout << "CMyString construct!" << endl;
	}
}

CMyString::~CMyString()
{
	if (NULL != m_pData)
	{
		free(m_pData);
		m_pData = NULL;
		len = 0;
	}
}

CMyString::CMyString(const CMyString &str)
{
	memcpy(this, &str, sizeof(CMyString));
}

CMyString & CMyString::operator=(const CMyString &str)
{
	if (this == &str)
	{
		return *this;
	}
	delete[]m_pData;
	m_pData = NULL;

	m_pData = new char[strlen(str.m_pData) + 1];
	strcpy(m_pData, str.m_pData);

	return *this;
}

int main()
{
	CMyString a("ducan");
	CMyString b(a);
	CMyString c, d;
	c = d = b;
	return 0;
}
