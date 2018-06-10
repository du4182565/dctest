def run(name,*arg,**args):
	for a in arg:
		print a,arg
	keys = args.keys()
	for k in keys:
		print k,args
		
run('aa','bb','cc','dd',f='1',g='3')