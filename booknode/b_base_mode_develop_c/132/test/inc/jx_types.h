/*************************************************************************
	> File Name: jx_types.h
	> Author: 
	> Mail: 
	> Created Time: Mon 11 Feb 2019 11:39:20 PM PST
 ************************************************************************/

#ifndef _JX_TYPES_H
#define _JX_TYPES_H
typedef signed char _i8;
typedef unsigned char _u8;
typedef signed short _i16;
typedef unsigned short _u16;
typedef signed int _i32;
typedef unsigned int _u32;
typedef char _c;
typedef char * _s;

typedef struct{
    _i32 i;
    _i8  c;
    _u16 us;
}_XXX;

#define _getpStructMem(_T_,p,m) ((_T_ *)(p))->m

typedef _u32 _I;
#define _tp(p,_T_) ((_T_ *)(p))
#define __offsetp(m, _T_) (_p)(&_tp(0,_T_)->m) //error code in book！！
#define __offset(m,_T_) ((_I) (__offsetp(m,_T_)))

typedef struct{
    _I _next;
    _I _prec;
}_DEFNODE;

typedef struct{
    _I _next;
    _I _prec;
    _I _vpos;
    _I _vn;
}_DEFVALNODE;

#define _Inext(pI, i) ((pI) + (i))->_next
#define _Iprec(pI, i) ((pI) + (i))->_prec

#endif
