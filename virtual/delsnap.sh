#!/bin/bash
date=$(date +"%Y%m%d")

qvmids=(105 279 400 401 106 300 301)

# 开始删除过期快照
for qvmid in ${qvmids[@]}
do
	
	snaplist=(`/usr/sbin/qm listsnapshot $qvmid |awk -F'->' '{print $2}'|awk '{print $1}'`)
	snaplistlen=${#snaplist[@]}
	for snapid in ${snaplist[@]}
	do
		echo "snapid: "${snapid}
	done
	reslen=$((snaplistlen - 2))
	res=("${snaplist[@]:0:$reslen}")
	for resid in ${res[@]}
	do
		echo "resid: "${resid}
		/usr/sbin/qm delsnapshot $qvmid ${resid} 
	done
done
