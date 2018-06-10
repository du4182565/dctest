def f(a,L = []):
	L.append(a)
	return L
	
def fp(a,L = None):
	if	None is L:
			L=[]
	L.append(a)
	return L
	
print f(1)
print f(2)
print f(3)

print fp(4)
print fp(5)
print fp(6)
	