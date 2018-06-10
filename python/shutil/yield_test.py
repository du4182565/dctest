__author__ = 'Administrator'

def fab(max):
    n, a, b = 0, 0, 1
    print "yield before"
    yield b
    a, b = b, a + b
    n = n + 1

f =  fab(5)
print f.next()
print f.next()
print f.next()
print f.next()
