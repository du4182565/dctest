__author__ = 'Administrator'
import wx
app = wx.App()
win = wx.Frame(None, title = "Simple Editor")
loadbtn = wx.Button(win, label = 'Open', pos=(225,5
savebtn = wx.Button(win,label = 'Save')
win.Show(d
app.MainLoop()

