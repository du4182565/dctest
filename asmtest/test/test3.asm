;代码段将内存FFFF:0~FFFF:F内存单元中的数据复制到 0:200~0:20f中
assume cs:code

code segment
	
	mov ax,0FFFFh
	mov ds,ax
	mov bx,0
	mov cx,16
	
setNumber:	push ds
			mov dl,ds:[bx]
			
			mov ax,20h
			mov ds,ax
			mov ds:[bx],dl
			pop ds
			loop setNumber
			
			mov ax,4c00h
			int 21h
code ends
end