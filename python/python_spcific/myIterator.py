__author__ = 'Administrator'

class MyIterator(object):
    def __init__(self,step):
        self.step = step

    def next(self):
        """retuen the next element"""
        if self.step == 0:
            raise StopIteration
        self.step -= 1
            return self.step

    def __iter__(self):
        return self


