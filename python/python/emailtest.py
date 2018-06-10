__author__ = 'Administrator'
from email.mime.text import MIMEText
msg=MIMEText('hello.send ny python','plain','utf-8')
from_addr = raw_input('From: ')
password=raw_input('password: ')
smtp_server=raw_input('SMPT server:')