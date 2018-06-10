__author__ = 'Administrator'

class StoreTest(object):
    databases = []

    def initbase(basename):
        basename = {}
        basename[1] = {}
        basename[2] = {}
        basename[3] = {}

    def add_database(self,basename):
        initbase(basename)
        dabases.append(basename)
        return

    def del_database(basename):
        if basename in databases:
            databases.pop(basename)
        else:
            print '%s is not exit' %basename
        return

    def view_data_base():
        for index,base in enumerate(basename):
            print '%s,%s' % index,base
        return

    def add_member(database,member_name):
        for index,name in enumerate(database):
            database[index].setdefault(name,[]).append(member_name)
        return

#    def del_member(database,member_name,label):
#        database[label].setdefault(name,[]).del(member_name)
#        return

    def view_member(database,member_name,label):
            print database[label].[member_name]
        return







