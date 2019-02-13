/*************************************************************************
	> File Name: base_op.h
	> Author: 
	> Mail: 
	> Created Time: Tue 12 Feb 2019 08:22:07 PM PST
 ************************************************************************/

#ifndef _BASE_OP_H
#define _BASE_OP_H
#define _rshf(a,n) ((a) >> (n))
#define _lshf(a,n) ((a) << (n))

#define _Lclr(a,n) _lshf(_rshf(a,n),n)
#define _Rclr(a,n) _rshf(_lshf(a,n),n)

#define _rshfB(a,n) _rshf(a,(n) * 8)
#define _lshfB(a,n) _lshf(a,(n) * 8)
#define _LclrB(a,n) _lshfB(_rshfB(a,n),n)
#define _RclrB(a,n) _rshfB(_lshfB(a,n),n)

#define _getB(pa,n,_T_) (_rshfB(pa[0],n) | _lshfB(pa[1], sizeof(_T_) - n) )

#define _BITS_SIZE(n) (1 << n)
#define _BITS_MASK(n) (_BITS_SIZE(n) - 1)
#define _BITSET(n) _BITS_SIZE(n)
#define _get_bit(d, bit) ((d) & _BITSET(bit))
#define _set_bit(d, bit) do{d |= _BITSET(bit);}while(0)
#define _clr_bit(d, bit) do{d &= (~(_BITSET));}while(0)
#define _chk_bit(d, bit) _get_bit(d, bit)


#define _BITPOS(n, bsize) ((n)  >> (bsize))
#define _BITBIAS(n, bsize) ((n) & _BITS_MASK(bsize))

#define _get_bits(p,k,bsize) _get_bit((p)[_BITPOS(k,bsize)],_BITBIAS(k,bsize))
#define _set_bits(p,k,bsize) _set_bit((p)[_BITPOS(k,bsize)],_BITBIAS(k,bsize))
#define _clr_bits(p,k,bsize) _clr_bit((p)[_BITPOS(k,bsize)],_BITBIAS(k,bsize))
#define _chk_bits(p,k,bsize) _chk_bit((p)[_BITPOS(k,bsize)],_BITBIAS(k,bsize))

#define _8bsize 3
#define _16bsize 4
#define _32bsize 5
#define _64bsize 6

#define _get_8_bits(p,k) _get_bits(p,k,_8bsize) 
#define _chk_8_bits(p,k) _get_8_bits(p,k)
#define _set_8_bits(p,k) _set_bits(p,k,_8bsize)
#define _clr_8_bits(p,k) _clr_bits(p,k,_8bsize)
#define _get_16_bits(p,k) _get_bits(p,k,_16bsize) 
#define _chk_16_bits(p,k) _get_16_bits(p,k)
#define _set_16_bits(p,k) _set_bits(p,k,_16bsize)
#define _clr_16_bits(p,k) _clr_bits(p,k,_16bsize)
#define _get_32_bits(p,k) _get_bits(p,k,_32bsize) 
#define _chk_32_bits(p,k) _get_32_bits(p,k)
#define _set_32_bits(p,k) _set_bits(p,k,_32bsize)
#define _clr_32_bits(p,k) _clr_bits(p,k,_32bsize)
#define _get_64_bits(p,k) _get_bits(p,k,_64bsize) 
#define _chk_64_bits(p,k) _get_64_bits(p,k)
#define _set_64_bits(p,k) _set_bits(p,k,_64bsize)
#define _clr_64_bits(p,k) _clr_bits(p,k,_64bsize)

enum{
    ENUM_Lchars = 0,
    ENUM_Uchars,
    ENUM_Nchars,
    ENUM_Pchars,
    ENUM_Bchars,
    ENUM_CBchars,
    ENUM_Hchars,
};

#define _LcharMASK _BITSET(ENUM_Lchars)
#define _UcharMASK _BITSET(ENUM_Uchars)
#define _NcharMASK _BITSET(ENUM_Nchars)
#define _PcharMASK _BITSET(ENUM_Pchars)
#define _BcharMASK _BITSET(ENUM_Bchars)
#define _CBcharMASK _BITSET(ENUM_CBchars)
#define _HcharMASK _BITSET(ENUM_Hchars)

#define _AcharMASK (_LcharMASK | _UcharMASK)
#define _ScharMASk (_BcharMASK | _CBcharMASK)
#define _ANcharMASK (_AcharMASK | _NcharMASK)

#define _islower(c) _chk_bit(CHARS_TAB[(_u8)(c)], _LcharMASK)
#define _isupper(c) _chk_bit(CHARS_TAB[(_u8)(c)], _UcharMASK)
#define _isalpha(c) _chk_bit(CHARS_TAB[(_u8)(c)], _AcharMASK)
#define _isdigit(c) _chk_bit(CHARS_TAB[(_u8)(c)], _NcharMASK)
#define _isalnum(c) _chk_bit(CHARS_TAB[(_u8)(c)], _ANcharMASK)
#define _isprint(c) _chk_bit(CHARS_TAB[(_u8)(c)], _PcharMASK)
#define _isblank(c) _chk_bit(CHARS_TAB[(_u8)(c)], _BcharMASK)
#define _isspace(c) _chk_bit(CHARS_TAB[(_u8)(c)], _ScharMASK)
#define _isxdigit(c) _chk_bit(CHARS_TAB[(_u8)(c)], _HcharMASK)


enum{
    ENUM_TAB_CLR = 0,
    ENUM_TAB_SET
};

#endif
