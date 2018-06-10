def log(text):
	def decorator(func):
		def wrapper(*args,**kw):
			print	'%s,%s():' %(text,func.__name__)
			return func(*args,**kw)
		return wrapper
	return decorator	

dada = log("ducan")
da = dada('now')
#@log('aa')
def now():
	print 'kao'
	
now()

print "1-------------------"

def deco(func):
    print("before myfunc() called.")
    func()
    print("  after myfunc() called.")
    return func

@deco
def myfunc():
    print(" myfunc() called.")

myfunc()
myfunc()

def makebold(fn):
	def wrapped():
		return "<b>" + fn() + "</b>"
	return wrapped

def makeitalic(fn):
	def wrapped():
		return "<i>" + fn() + "</i>"
	return wrapped

@makebold
@makeitalic
def hello():
	return "hello would"

print hello()

print "2----------------------------------"
def defunc(func):
	def _deco(a,b):
		print("before func called")
		ret = func(a,b)
		print("after func called")
		return ret
	return _deco

@defunc
def myfunc(a,b):
	print("myfunc(%s,%s) called." %(a,b))
	return a + b

myfunc(1,2)
myfunc(3,4)

print "3-----------------------------------------------"
def deco(arg):
    def _deco(fun):
        def __deco():
            print("before %s called [%s]." % (fun.__name__, arg))
            fun()
            print("  after %s called [%s]." % (fun.__name__, arg))
        return __deco
    return _deco

@deco("mymodule")
def myfunc():
    print(" myfunc() called.")

@deco("module2")
def myfunc2():
    print(" myfunc2() called.")

myfunc()
myfunc2()

print "3-----------------------------------------------"
class local:
	def __init__(self):
		print("local is called")

	@staticmethod
	def acquire():
		print("local acquire is called ")

	@staticmethod
	def release():
		print("local release is called")

def deco(cls):
	def _deco(func):
		def __deco():
			print("before %s called [%s]" % (func.__name__,cls))
			cls.acquire()
			try:
				return func()
			finally:
				cls.release()
		return __deco
	return _deco
@deco(local)
def myfunc():
	print("myfunc is called")

myfunc()

