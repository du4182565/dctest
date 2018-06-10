__author__ = 'Administrator'
import os
from shutil import  *
from hashlib import md5
import datetime
import time
import random

targetPath='D:\pytest.jpg'
srcPath=['D:\\image1\\']
dstPath='D:\\image2\\'
filekey={}
year={}

def md5_file(name):
    m = md5()
    a_file = open(name,'rb')
    m.update(a_file.read())
    a_file.close()
    return m.hexdigest()

def dofile(arg,dir,names):
    for name in names:
        subname = os.path.join(dir,name)
        if os.path.isdir(subname):
            continue
        if not os.path.exists(subname):
            continue

        key = md5_file(subname)
        if not filekey.has_key(key):
            filekey[key] = subname
            print 'file ok' , subname
            continue

        if os.path.exists(os.path.join(dstPath,name)):
            name = ''.join(name.split('.')[:-1] + str(random.randint(1,100))+'.')
        copy2(subname,os.path.join(dstPath,name))
        os.remove(subname)
        print 'remove',subname


for path in srcPath:
    os.path.walk(path,dofile,'')

