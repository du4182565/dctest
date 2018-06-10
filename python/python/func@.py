def spamrun(fn):
	def sayspam(*args):
		print "spam,spam,spam"
	return sayspam

@spamrun
def useful(a,b):
	print a**2 + b**2
	
useful(2,3)
