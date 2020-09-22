;pro6.1 代码段中使用数据
assume cs:codesg

codesg segment

	 dw 0123h,0456h,0789h,0abch,0defh,0fedh,0cbah,0987h
	
	 dw 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	 
	 mov bx,0
	 mov ax,0
	 mov cx,8
   
   s:add ax,cs:[bx]
	 add bx,2
	 loop s
	 
	 mov ax, 4c00h
	
	 mov ax,4c00h
	 int 21h
codesg ends
end