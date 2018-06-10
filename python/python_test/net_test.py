__author__ = 'Administrator'

class Test(object):

    def InstanceFun(self):
        print("InstanceFun")
        print(self)

    @classmethod
    def ClassFun(cls):
        print("ClassFun")
        print(cls)

    @staticmethod
    def StaticFun():
        print("StaticFun")

    def Ballshurt():
        print("Ballshurt")


t = Test()
t.InstanceFun()
Test.ClassFun()

#est.Ballshurt()
Test.StaticFun()
t.StaticFun()
t.ClassFun()
#est.InstanceFun(t)
#est.InstanceFun(Test)

