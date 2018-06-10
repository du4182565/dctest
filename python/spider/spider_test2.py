__author__ = 'Administrator'

import urllib

from sgmllib import SGMLParser

class URLListener(SGMLParser):
    def reset(self):
        SGMLParser.reset(self)
        self.urls = []

    def start_a(self,attrs):
        href = [v for k,v in attrs if k == 'href']

        if href:
            self.urls.extend(href)

url = r'http://www.sinc.sunysb.edu/Clubs/buddhism/JinGangJinShuoShenMo'
sock = urllib.urlopen(url)
htmlSource = sock.read()
sock.close()

mypath = r'http://www.sinc.sunysb.edu/Clubs/buddhism/JinGangJinShuoShenMo'

parser = URLListener()
parser.feed(htmlSource)

for url in parser.urls:
    myurl = mypath + url
    print "get: " + url
    sock2 = urllib.urlopen(myurl)
    html2 = sock2.read()
    sock2.close()

    print "save as: " + url
    f2 = file(url, 'w')
    f2.write(html2)
    f2.close