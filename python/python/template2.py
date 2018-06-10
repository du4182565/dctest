from string import Template
s = Template('$x,glorious $x')
s.substitute(x='slum')
a = Template("Its ${x}tastic!!")
a.substitute(x='slum')
b = Template("Make $$ selling $x!")
b.substitute(x='slum')
