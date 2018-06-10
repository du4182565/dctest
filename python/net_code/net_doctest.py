__author__ = 'Administrator'
def multiply(a,b):
    """
    >>> multiply(2,3)
    4
    >>> multiply('baka~',3)
    'baka~baka~baka~'
    """
    return a*b

if __name__ == '__main__':
    import doctest
    doctest.testmod(verbose=True)