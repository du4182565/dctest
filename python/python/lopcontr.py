print 'a'
raw_input()
age = int(raw_input('input'))
if None == age:
	quit()

if age > 18:
	print 'your age is',age
else:
	print 'child'
sum = 0
for i in range(10):
	sum = sum + i
print sum


