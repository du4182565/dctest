import pygame,sys,time,random
from pygame.locals import*

FPS = 25
winx = 640
winy = 480
boxsize = 20
boardwidth = 10
boardheight = 20
xmargin = int(winx-boardwidth*boxsize)/2
topmargin = int(winy-boardheight*boxsize-5)
templatenum = 5

movedownfreq = 0.1
movesidefreq = 0.15

white = (255,255,255)
black = (0,0,0)
blue = (0,0,255)
yellow = (255,255,0)
green = (0,255,0)
purple = (255,0,255)
red = (255,0,0)
blank = '.'
colors = (yellow,green,purple,red)

stemplate = [['.....',
              '..00.',
              '.00..',
              '.....',
              '.....'],
             ['.....',
              '..o..',
              '..00.',
              '...0.',
              '.....']]

ztemplate = [['.....',
              '.00..',
              '..00.',
              '.....',
              '.....'],
             ['.....',
              '...0.',
              '..00.',
              '..0..',
              '.....']]

itemplate = [['..0..',
              '..0..',
              '..0..',
              '..0..',
              '.....'],
             ['.....',
              '.0000',
              '.....',
              '.....',
              '.....']]

otemplate = [['.....',
              '..00.',
              '..00.',
              '.....',
              '.....']]

ltemplate = [['.....',
              '..0..',
              '..0..',
              '..00.',
              '.....'],
             ['.....',
              '...0.',
              '.000.',
              '.....',
              '.....'],
             ['.....',
              '..00.',
              '...0.',
              '...0.',
              '.....'],
             ['.....',
              '.000.',
              '.0...',
              '.....',
              '.....']]

jtemplate = [['.....',
              '..0..',
              '..0..',
              '.00..',
              '.....'],
             ['.....',
              '.000.',
              '...0.',
              '.....',
              '.....'],
             ['.....',
              '..00.',
              '..0..',
              '..0..',
              '.....'],
             ['.....',
              '.0...',
              '.000.',
              '.....',
              '.....']]

ttemplate = [['.....',
              '..0..',
              '.000.',
              '.....',
              '.....'],
             ['..0..',
              '.00..',
              '..0..',
              '.....',
              '.....'],
             ['.....',
              '.000.',
              '..0..',
              '.....',
              '.....'],
             ['..0..',
              '..00.',
              '..0..',
              '.....',
              '.....']]
pieces = {'s':stemplate,
          'z':ztemplate,
          'i':itemplate,
          'o':otemplate,
          'l':ltemplate,
          'j':jtemplate,
          't':ttemplate}
def main():
    global fpsclock,disp,basicfont,bigfont
    pygame.init()
    fpsclock = pygame.time.Clock()
    disp = pygame.display.set_mode((winx,winy))
    pygame.display.set_caption('tetromino')
    bigfont = pygame.font.Font('freesansbold.ttf',100)
    basicfont = pygame.font.Font('freesansbold.ttf',20)

    showtextscreen('Tetromino')
    while True:
        if random.randint(0,1) == 0:
            pygame.mixer.music.load('tetrisb.mid')
        else:
            pygame.mixer.music.load('tetrisc.mid')
        pygame.mixer.music.play(-1,0.0)
        rungame()
        pygame.mixer.music.stop()
        showtextscreen('Game Over')

def rungame():
    board = getblankboard()
    lastmovedowntime = time.time()
    lastmovesidetime = time.time()
    lastfalltime = time.time()
    movedown = False
    moveleft = False
    moveright = False
    score = 0
    level, fallfreq = calculate(score)

    fallpiece = getnewpiece()
    nextpiece = getnewpiece()

    while True:
        if fallpiece == None:
            fallpiece = nextpiece
            nextpiece = getnewpiece()
            lastfalltime = time.time()

            if not validposition(board,fallpiece):
                return
            
        checkforquit()
        for event in pygame.event.get():
            if event.type == KEYUP:
                if (event.key == K_p):
                    disp.fill(black)
                    pygame.mixer.music.stop()
                    showtextscreen('Paused')
                    pygame.mixer.music.play(-1,0.0)
                    lastfalltime = time.time()
                    lastmovedowntime = time.time()
                    lastmovesidetime = time.time()
                elif (event.key == K_LEFT or event.key == K_a):
                    moveleft = False
                elif (event.key == K_RIGHT or event.key == K_d):
                    moveright = False
                elif (event.key == K_DOWN or event.key == K_s):
                    movedown = False
                    
            elif event.type == KEYDOWN:
                if (event.key == K_LEFT or event.key == K_a) and validposition(board,fallpiece,ax = -1):
                    fallpiece['x']-=1
                    moveleft = True
                    moveright = False
                    lastmovesidetime = time.time()
                elif (event.key == K_RIGHT or event.key == K_d) and validposition(board,fallpiece,ax = 1):
                    fallpiece['x']+=1
                    moveright = True
                    moveleft = False
                    lastmovesidetime = time.time()

                elif (event.key == K_UP or event.key ==K_w):
                    fallpiece['rotation'] =  (fallpiece['rotation'] + 1) % len(pieces[fallpiece['shape']])
                    if not validposition(board,fallpiece):
                        fallpiece['rotation'] = (fallpiece['rotation'] - 1) % len(pieces[fallpiece['shape']])
                elif (event.key == K_DOWN or event.key ==K_s):
                    movedown = True
                    if validposition(board,fallpiece, ay = 1):
                        fallpiece['y']+=1
                    lastmovedowntime = time.time()

                if event.key == K_SPACE:
                    movedown = False
                    moveleft = False
                    moveright = False
                    for i in range(1,boardheight):
                        if not validposition(board,fallpiece,ay = i):
                            break
                    fallpiece['y'] += i-1
        
        if (moveleft or moveright) and time.time()-lastmovesidetime > movesidefreq:
            if moveleft and validposition(board,fallpiece,ax = -1):
                fallpiece['x']-=1
            if moveright and validposition(board,fallpiece,ax = 1):
                fallpiece['x']+=1
            lastmovesidetime = time.time()

        if movedown and time.time()-lastmovedowntime>movedownfreq and validposition(board,fallpiece,ay=1):
            fallpiece['y']+=1
            lastmovedowntime = time.time()
        if time.time()-lastfalltime>fallfreq:
            if not validposition(board,fallpiece,ay = 1):
                addtoboard(board,fallpiece)
                score +=removecompleteline(board)
                level,fallfreq = calculate(score)
                fallpiece = None
            else:
                fallpiece['y'] +=1
                lastfalltime = time.time()


        disp.fill(black)
        drawboard(board)
        drawstatus(score,level)
        drawnextpiece(nextpiece)
        if fallpiece !=None:
            drawpiece(fallpiece)

        pygame.display.update()
        fpsclock.tick(FPS)
                    
                    
                
            

def calculate(score):
    level = int(score/10)+1
    fallfreq = 0.27-(level*0.02)
    return level,fallfreq


    
def terminal():
    pygame.quit()
    sys.exit()
    
def checkforquit():
    for event in pygame.event.get(QUIT):
        terminal()
    for event in pygame.event.get(KEYUP):
        if event.key == K_ESCAPE:
            terminal
        pygame.event.post(event)
        
def checkforpress():
    checkforquit()

    for event in pygame.event.get([KEYDOWN,KEYUP]):
        if event.type == KEYDOWN:
            continue
        return event.key
    return None

def maketext(text,font,color):
    surf = font.render(text,1,color)
    return surf,surf.get_rect()
    
def showtextscreen(text):
    tilesurf,tilerect = maketext(text,bigfont,white)
    tilerect.center = (int(winx/2),int(winy/2))
    disp.blit(tilesurf,tilerect)

    presssurf,pressrect = maketext('press a key to play',basicfont,white)
    pressrect.center = (int(winx/2),int(winy/2)+100)
    disp.blit(presssurf,pressrect)

    while checkforpress() == None:
        pygame.display.update()
        fpsclock.tick()
    
def getnewpiece():
    shape = random.choice(list(pieces.keys()))
    newpiece = {'shape':shape,
                'rotation': random.randint(0,len(pieces[shape])-1),
                'x': int(boardwidth)/2-int(templatenum/2),
                'y': -2,
                'color': random.randint(0,len(colors)-1)}
    return newpiece

def getblankboard():
    board = []
    for x in range(boardwidth):
            board.append([blank]*boardheight)
    return board

def addtoboard(board,piece):
    for x in range(templatenum):
        for y in range(templatenum):
            if pieces[piece['shape']][piece['rotation']][y][x]!=blank:
                board[x + piece['x']][y + piece['y']] = piece['color']
            
def onboard(x,y):
    return x >=0 and x<boardwidth and y<boardheight
    
def validposition(board,piece,ax = 0,ay = 0):
    for x in range(templatenum):
        for y in range(templatenum):
            aboveboard = y +piece['y'] +ay < 0
            if aboveboard or pieces[piece['shape']][piece['rotation']][y][x]== blank:
                continue
            if not onboard(x + piece['x']+ax,y+piece['y']+ay):
                return False
            if board[x+piece['x']+ax][y+piece['y']+ay]!=blank:
                return False
    return True


def completeline(board,y):
    for x in range(boardwidth):
        if board[x][y]==blank:
            return False
    return True

def removecompleteline(board):
    numremove = 0
    y = boardheight-1
    while y >=0:
        if completeline(board,y):
            for pulldowny in range(y,0,-1):
                for x in range (boardwidth):
                    board[x][pulldowny] = board[x][pulldowny-1]
            for x in range(boardwidth):
                board[x][0] = blank
            numremove+=1
        else:
            y-=1
    return numremove

def convertsize(boxx,boxy):
    return (boxx*boxsize+xmargin,boxy*boxsize+topmargin)

def drawbox(boxx,boxy,color,pixelx = None,pixely= None):
    if color == blank:
        return
    if pixelx == None and pixely == None:
        pixelx,pixely = convertsize(boxx,boxy)
    pygame.draw.rect(disp,colors[color],(pixelx+1 , pixely+1,boxsize-1,boxsize-1))
    
def drawboard(board):
    pygame.draw.rect(disp,blue,(xmargin-3,topmargin-7,boardwidth*boxsize+8,boardheight*boxsize+8),5)
    for x in range(boardwidth):
        for y in range(boardheight):
            drawbox(x,y,board[x][y])

def drawstatus(score,level):
    scoresurf = basicfont.render('Score: %s'%score,True,white)
    scorerect = scoresurf.get_rect()
    scorerect.topleft = (winx-150,20)
    disp.blit(scoresurf,scorerect)

    levelsurf = basicfont.render('level: %s'%level,True, white)
    levelrect = levelsurf.get_rect()
    levelrect.topleft = (winx-150,50)
    disp.blit(levelsurf,levelrect)

def drawpiece(piece,pixelx = None,pixely = None):
    shapedraw = pieces[piece['shape']][piece['rotation']]
    if pixelx == None and pixely == None:
        pixelx,pixely = convertsize(piece['x'],piece['y'])
    for x in range(templatenum):
        for y in range(templatenum):
            if shapedraw[y][x]!=blank:
                drawbox(None,None,piece['color'],pixelx+(x*boxsize),pixely + y*boxsize)

def drawnextpiece(piece):
    nextsurf = basicfont.render('Next:',True,white)
    nextrect =nextsurf.get_rect()
    nextrect.topleft = (winx-120,80)
    disp.blit(nextsurf,nextrect)

    drawpiece(piece,pixelx = winx-120,pixely = 100)
    
if __name__ == '__main__':
    main()
