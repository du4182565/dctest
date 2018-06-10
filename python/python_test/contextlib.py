__author__ = 'Administrator'

#---------------------------------------
class DummyResource:
    def __init__(self,tag):
        self.tag = tag
        print 'Resource [%s]'  % tag
    def __enter__(self):
        print '%s in enter' % self.tag
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print 'in exit'
        if exc_tb is None:
            print ' not NOne'
        else:
            print 'Exit with exceptuion raised'
            return False



with DummyResource('fuck python!'):
    print 'without python'
