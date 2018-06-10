__author__ = 'Administrator'

import wx

app = wx.App()
win = wx.Frame(None, title="Simple Editor", size=(410,335))
bkg = wx.Panel(win)

loadBtn = wx.Button(bkg, label='Open')
saveBtn = wx.Button(bkg, label='Save')
filename = wx.TextCtrl(bkg)
contents = wx.TextCtrl(bkg,style = wx.TE_MULTILINE | wx.HSCROLL)

hbox = wx.BoxSizer()
hbox.Add(filename, proportion = 1,flag = wx.EXPAND)
hbox.Add(loadBtn, proportion = 0,flag=wx.LEFT, border = 5)
hbox.Add(saveBtn, proportion = 0,flag=wx.LEFT, border = 5)

vbox = wx.BoxSizer(wx.VERTICAL)
vbox.Add(hbox, proportion = 0, flag = wx.EXPAND | wx.ALL, border = 5)
vbox.Add(contents,proportion=1, flag = wx.EXPAND| wx.LEFT | wx.BOTTOM | wx.RIGHT,border = 5)

bkg.SetSizer(vbox)
win.Show()

app.MainLoop()
