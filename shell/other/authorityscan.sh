#!/bin/bash
bin_path="/usr/bin/:/usr/sbin/:/usr/local/bin/:/usr/local/sbin/:/RayOS/:"
#bin_path="/usr/local/bin/:/RayOS/:"
SAVEIFS=$IFS
binarykey="ELF 64-bit LSB"

declare -A hashtablex
hashtablex=()


judgment(){
	local dir="$1"
	
	for filex in `find $dir -type f -perm -100|egrep -v "\.so|\.md|\.conf|\.properties|\.py|\.txt|\.xml|\.cfg|\.h|\.policy|\.pyc"`
    do
		attr=`file $filex`
		if [[ $attr  =~ $binarykey ]];
		then
			owner=`ls -lrt $filex |awk -F' ' '{print $3}'`
			group=`ls -lrt $filex |awk -F' ' '{print $3}'`
			for ldinfo in `ldd $filex|awk -F'=> ' '{print $2}'|egrep -v "^$|libc.so.6"|cut -d' ' -f1`
			do
				post=`echo $ldinfo| sed "s/[^A-Za-z0-9]//g"`
				posy="${post}"
				index=${hashtablex["${posy}"]}	
				if [ "x$index" != "x" ];then
					index="${index}:${filex}"
					hashtablex["${posy}"]=$index
				else
					hashtablex["${posy}"]="@${ldinfo}@${filex}"
				fi
				#echo ${hashtablex[$post]}
				#echo "======================debug begin============="
				#for j in ${!hashtablex[@]}
				#do
        		#	echo "$j: ${hashtablex[$j]} "
				#done
				#echo "======================debug end============="
			done
		fi
	done
}

main()
{
	IFS=":"
	binarray=($bin_path)
	IFS=$SAVEIFS
	for element in ${binarray[@]}
	do
		judgment $element
	done
	echo "======================debug begin============="
	for k in ${!hashtablex[@]}
	do
		echo "k=$k: k-value:${hashtablex[$k]}"
	done
	echo "======================debug end============="
}
main
