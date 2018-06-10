__author__ = 'Administrator'

queue = []

def enqueue():
    queue.append(raw_input('Enter new string').strip())

def dequeue():
    if len(queue) == 0:
        print 'the queue is empty!'
    else:
        print 'Removed [',queue.pop(0)enqueue(), ']'

def view():
    print queue

CMD = {'e':enqueue,'d':dequeue,'v':view,'q':quit}

def showmenu():
      promt = '''
            please input (E)nqueue
                         (D)equeue
                         (V)iew
                         (Q)uit

             enter select:
        '''
      while True:
            try:
                choice = raw_input(promt).strip()[0].lower()
            except (EOFError,KeyboardInterrupt,IndexError):
                choice = 'q'

            print '\n you picked: [%s] '  %  choice
            if choice not in 'devq':
                print 'invaild input'
            else:
                if choice == 'q':
                    break
                else:
                    CMD[choice]()


if __name__ == '__main__':
    showmenu()