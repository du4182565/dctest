__author__ = 'Administrator'

import sys
import shelve

def store_person(db):

    pid = raw_input('Enter unique ID number:')
    person = {}
    person['name'] = raw_input('Enter name: ')
    person['age'] = raw_input('Enter age: ')
    person['phone'] = raw_input('Enter number ')

    db[pid] = person

def lookup_person(db):
    pid = raw_input('Enter ID number: ')
    filed = raw_input('what would you like to now? (name, age, phone)')
    field = field.strip().lower()
    print filed.capitalize() + ':' , db[pid][filed]

def enter_command():
    cmd = raw_input('Enter commond(>for help): ')
    cmd = cmd.strip().lower()
    return cmd

def main():
    database = shelve.open(r'c:\1.dat', 'c')
    try:
        while True:
            cmd = enter_command()
            if cmd == 'store':
                store_person(database)
            elif cmd == 'lookup':
                lookup_person(database)
            elif cmd[0] == 'q':
                return

    finally:
        database.close()

if __name__ ==  '__main__':
    main()





