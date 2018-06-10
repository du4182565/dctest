width = input('please enter width')

price_width = 10
item_width = width - price_width

head_format = '%-*s%*s'
format      = '%-*s%*.2f'

print '='*width
print head_format % (item_width,'Item',price_width,'Price')
print '-'*width 

print format % (item_width,'Apple',price_width,0.4)