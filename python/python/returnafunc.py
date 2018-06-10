def calc_num(*args):
	ax = 0
	for n in args:
		ax = ax + n
	return ax
	
def lazy_num(*args):
	def sum():
		ax = 0
		for n in args:
			ax = ax + n
		return ax
	return sum
	
print calc_num(5)
lazy_num(1234)()


#及时传入相同的参数 每次返回的如果是函数，地址不同
#>>> f1 = lazy_sum(1, 3, 5, 7, 9)
#>>> f2 = lazy_sum(1, 3, 5, 7, 9)
#>>> f1==f2
#False