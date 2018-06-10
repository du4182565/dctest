__author__ = 'Administrator'
class DummyResource:
    def __init__(self, tag):
        self.tag = tag
        print 'Resource [%s]' % tag

    def __enter__(self):
        print '[ E nter %s]: Allocate resource' % self.tag
        return self
    def __exit__(self, exc_type, exc_value, exc_tb):
        print '[Exit %s]: Free resource' % self.tag
        if exc_tb is None:
            print '[Exit %s]' % self.tag
        else:
            print '[Exit %s]' % self.tag

with DummyResource('Normal'):
    print '[with-body] Run without exceptions.'

print '----------------'
with DummyResource('withexception'):
    print '[with-body] Run with exception'
    raise Exception
    print 'with-body Run with except. failed to dinish !'