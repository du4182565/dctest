__author__ = 'Administrator'

bobargs = {'title_contains': 'bob', 'subtitle_contains': 'bob',
           'text_contains': 'bob','byline_contain': 'bob'
           }
bob_Story.object.filter(**bobargs)

#这么你就可以创建动态字典了。

bobargs = dict{(f + '_