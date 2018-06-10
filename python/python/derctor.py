def addspam(fn):
	def new(*args):
		print "spam,spam,spam"
		return fn(*args)
	return new
	
@addspam
def useful(a,b):
	print a**2 + b **2

useful(4,3)