__author__ = 'Administrator'

import Image

im = Image.open('d:\pytest.jpg')
w, h = im.size

im.thumbnail((w//2, h//2))
im.save('d:\pytest1.jpg')


