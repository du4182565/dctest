__author__ = 'Administrator'

class Person:

    def __init__(self):
        print "init"

    @staticmethod
    def sayHello(hello):
        if not hello:
            hello='hello'
        print "i will sya %s" % hello

    @classmethod
    def introduce(cls,hello):
        cls.sayHello(hello)
        print "from introduce method"

    def hello(self,hello):
        self.sayHello(hello)
        print "from hello method"


def main():
    Person.sayHello("haha")
    Person.introduce("hello would!")

    print "*"*20
    p = Person()
    p.sayHello("hah")
    p.introduce("hello wou")
    p.hello("self.hello")


if __name__ == '__main__':
    main()