__author__ = 'Administrator'
import os

if __name__ == '__main__':
    readfile = raw_input('input the read file name!!')
    writefile = raw_input('input the write file name!!')

    try:
        with open(readfile,'r') as reader, \
            open(writefile,'w') as writer:
            writer.write(reader.read())
    except IOError:
        print 'file is not exists'
