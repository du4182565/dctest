__author__ = 'Administrator'

import fileinput

#for line in fileinput.input('fileinput.txt'):
   # print fileinput.filename(),'|','Line Number:',fileinput.lineno(),'|: ',line


def process(line):
    return line.lstrip() + ' line'

for line in fileinput.input(['1.txt','2.txt'],inplace=1):
    print line


