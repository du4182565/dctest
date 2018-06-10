template = '''<html>
<head><title>%(title)s</title></head>
<body>
<h1>%(title)s</h1>
<p>%(text)s</p>
</body>'''
data={'title':'111','text':'Welcone to my home page!!'}
print template % data