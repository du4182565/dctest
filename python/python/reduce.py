def f(x,y,z):
	return x*1000 + y*100 + z *10

b = reduce(f,[1,2,3,4,5,6])

print b

#reduce 智能穿进去两个参数
