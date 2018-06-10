__author__ = 'Administrator'
import timeit
import random

def generate(num):
    while num:
        yield random.randrange(10)
        num -= 1
  #      print 'num = %d'%num

def create_list(num):
    numbers = []
    while num:
        numbers.append(random.randrange(10))
        num -= 1
    return numbers

if __name__=='__main__':
    print timeit.timeit("sum(generate(100))", setup="from __main__ import generate", number=1)
    print timeit.timeit("sum(create_list(100))", setup="from __main__ import create_list", number=1)


