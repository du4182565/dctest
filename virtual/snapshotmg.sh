#!/bin/bash
# author alain
# site:https://www.alainlam.cn
# Proxmox VE(PVE) 自动快照，保留7天

# 当前日期
date=$(date +"%Y%m%d")
# 需要删除的日期
deldate=$(date -d "22 days ago" +%Y%m%d)

# 在此写入你想要备份的QVMIDs
# 如 qvmids=(100 101 102)
qvmids=(105 279 400 401 106 300 301)

# 开始创建快照
for qvmid in ${qvmids[@]}
do
    /usr/sbin/qm snapshot $qvmid snapshot_$date --description 'Automatic snapshot creation on '$date --vmstate 1
done

# 开始删除过期快照
for qvmid in ${qvmids[@]}
do
    /usr/sbin/qm listsnapshot $qvmid
    /usr/sbin/qm delsnapshot $qvmid snapshot_$deldate
done


# 在此写入你想要备份的LXC ids
# 如 lxcids=(100 101 102)
#lxcids=(103 104 105)

# 开始创建与删除过期快照
#for lxcid in ${lxcids[@]}
#do
#    pct delsnapshot $lxcid snapshot_$deldate
#    pct snapshot $lxcid snapshot_$date --description 'Automatic snapshot creation on '$date
#done
