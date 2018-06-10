class Student(object):
	def __init__(self,name):
		self.name = name
		self.a,self.b = 0,1
		
	def __str__(self):
		return 'Student object(name : %s)' % self.name
	
	def __iter__(self):
		return self
	
	def next(self):
		self.a,self.b = self.b,self.a + self.b
		if self.a > 100000:
			raise StopIteration();
		return self.a
class Fib(object):
	def __getitem__(self,n):
		a,b = 1,1
		for x in range(n):
			a,b = b, a+b
		return a
		