awk '{print NF >> FILENAME".sta"}' *.bcp

awk  -F ':'  '{print "filename:" FILENAME ",linenumber:" NR ",columns:" NF ",linecontent:"$0}'

awk -F"\t"  'if(colomn == ""){ colomn=NR } else { colomn!=NR {print "filename:" FILENAME ",linenumber:" NR ",columns:" NF "  >> static.log} }' *.bcp

awk '{if ($1==1) print "$1,FILENAME"; else if ($1==2) print "B"; else print "C"}' *.bcp

awk -F"\t"  '{if (column=="") column=NR; print "column :"$column ,"filename:" FILENAME ",linenumber:" NR ",columns:" NF }' *.bcp

awk -F"\t"  '{if (column==""){column=NR; print "column :"$column ,"filename:" FILENAME ",linenumber:" NR ",columns:" NF }}' *.bcp

awk -F"\t"  'BEGIN {print "begin-column :"$column} {if (column==""){column=$NF} else {print "column :"$column ,"filename:" FILENAME ",linenumber:" NR ",columns:" NF} }' *.bcp

awk -F"\t"  '{if (FNR==1){column=NF;} else {print "column :"column ,"filename:" FILENAME ",linenumber:" NR ",columns:" NF} }' *.bcp


awk -F"\t"  '{if (FNR==1){column=NF;print FILENAME"numNF:" column} else {if(column!=NF) print "column :"column ,"filename:" FILENAME ",linenumber:" NR ",columns:" NF} }' *.bcp

1.1、首先创建两个示例文件
[root@imzcy ~]# cat user.txt     #逗号分隔的三列分别表示：工号、姓名、部门编号
A0024,张三,10
A0019,李四,30
A0015,王五,40
A0021,孙六,80
[root@imzcy ~]# 
[root@imzcy ~]# cat group.txt    #逗号分隔的三列分别表示：部门编号、部门名称、部门位置
10,IT部,六层B区
20,财务部,七层C区
30,设计部,七层B区
40,人事部,六层C区
50,采购部,七层A区
60,招聘部,六层A区
70,法务部,七层D区
80,发展部,六层D区
90,总经办,六层E区
[root@imzcy ~]# 
 
1.2、在AWK中调用NR变量，查看其作用
1.2.1、可以看到NR可以为读入的文件添加行号(行号从1开始，NR显示行号、$0显示行所有内容)
[root@imzcy ~]# awk '{print NR,$0}' user.txt 
1 A0024,张三,10
2 A0019,李四,30
3 A0015,王五,50
4 A0021,孙六,80
[root@imzcy ~]# 
 
1.2.2、根据下面输出可以看到，当NR读入多个文件的时候，行号会从上一个文件结束值增加的
[root@imzcy ~]# awk '{print NR,$0}' user.txt group.txt 
1 A0024,张三,10
2 A0019,李四,30
3 A0015,王五,50
4 A0021,孙六,80
5 10,IT部,六层B区
6 20,财务部,七层C区
7 30,设计部,七层B区
8 40,人事部,六层C区
9 50,采购部,七层A区
10 60,招聘部,六层A区
11 70,法务部,七层D区
12 80,发展部,六层D区
13 90,总经办,六层E区
[root@imzcy ~]# 
