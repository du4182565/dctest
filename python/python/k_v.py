def fib(max):
		n,a,b = 0,0,1
		while n < max:
			a,b = b,a + b
			yield a
			n+=1
			
def getValueForGenerate(gen,index):
	n = 0
	for x in gen:
		if n == index:
			return x
		n += 1	
				
print getValueForGenerate(fib(6),0)
		