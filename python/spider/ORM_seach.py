__author__ = 'Administrator'

bobargs = {'title_contains': 'bob', 'subtitle_contains': 'bob',
           'text_contains': 'bob','byline_contain': 'bob'
           }
bob_Story.object.filter(**bobargs)

#��ô��Ϳ��Դ�����̬�ֵ��ˡ�

bobargs = dict{(f + '_