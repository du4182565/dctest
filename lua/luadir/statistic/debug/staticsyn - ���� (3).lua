if (gui_enabled()) then
	local ipproto_f = Field.new("ip.proto")
	local syn_f = Field.new("tcp.flags.syn")
	local ack_flag_f = Field.new("tcp.flags.ack")
	local seq_f = Field.new("tcp.seq")
	local ack_f = Field.new("tcp.ack")
	local testnum  = 22
	local syn1location = 0
	local syn2location = 1
	local syn3location = 2
	local fin1location = 3
	local fin2location = 4
	local fin3location = 5
	local fin4location = 6 
	--local syn1count = 0
	--local syn2count = 0
	--local syn3count = 0
	--local fin1count = 0
	--local fin2count = 0
	--local fin3count = 0
	--local fin4count = 0
	local pstatic = {
			frame = {},
			frame_len = 0,
			srcip = 0,
			dstip = 0,
			srcport = 0,
			dstport = 0,
			lastseq = 0,
			lastack = 0,
			syn1dump = 0,
			syn2dump = 0
	}
	local reletable = {}
	local timetable = {}
	local testcout = 1
	local srcinfo = {}
	local lastinfo = {
			syn1 = 0,
			syn2 = 0,
			syn3 = 0,
			fin1 = 0,
			fin2 = 0,
			fin3 = 0,
			fin4 = 0
	}
	local lastdumpinfo = {
			syn1 = 0,
			syn2 = 0,
			syn3 = 0,
			fin1 = 0,
			fin2 = 0,
			fin3 = 0,
			fin4 = 0
	}	
	
	function find_reletable(hashtable, pinfo, dir)
		local hashindex = tostring(pinfo.src) .. tostring(pinfo.dst) .. tostring(pinfo.src_port) .. tostring(pinfo.dst_port)
		local hashconindex = tostring(pinfo.dst) .. tostring(pinfo.src) .. tostring(pinfo.dst_port) .. tostring(pinfo.src_port)
		local exist = 0
		relenode = hashtable[hashindex]
		if relenode == nil then
			relenode = hashtable[hashconindex]
		end
		
		if dir == 1 then
			return relenode, hashconindex
		end
		return relenode, hashindex
	end
	
	function add_reletable(hashtable, index, pinfo, seq_num, ack_num, timel, dir)
		hashtable[index] = {
			timel = timeq,
			seqtable = {seq_num},
			acktable = {ack_num},
			frame_len = 1,
			srcip = pinfo.src,
			dstip = pinfo.dst,
			srcport = pinfo.src_port,
			dstport = pinfo.dst_port,
			syn1dump = 0,
			syn2dump = 0			
		}
		return hashtable[index]
	end
	
	function checkdump(hashtable, index, pinfo, seq_num, ack_num, timel, dir)
	
	end
	
	local function statisticsyntime()
		--timetable[syn1location] = 0
		--timetable[syn2location] = 0
		--timetable[syn3location] = 0
		--timetable[fin1location] = 0
		--timetable[fin2location] = 0
		--timetable[fin3location] = 0
		--timetable[fin4location] = 0
		local w = TextWindow.new("staticsyntime")
		--local timearray = {}
		w:set_editable()		
		local tap = Listener.new()
		
		local function remove()
			tap:remove()
			testcout = 2			
		end
		
		w:set_atclose(remove)
		
		function tap.packet(pinfo,tvb)	
			ipproto = ipproto_f()
			ipprototmp = tostring(ipproto)	
			if (ipprototmp == "6") then
				pinfotimetmp = pinfo.rel_ts - pinfo.rel_ts%1
				timenode = timetable[pinfotimetmp]
				if (timenode == nil) then
					timetable[pinfotimetmp] = {
								syn1 = 0,
								syn2 = 0,
								syn3 = 0,
								fin1 = 0,
								fin2 = 0,
								fin3 = 0,
								fin4 = 0,
								dumpsyn1 = 0,
								dumpsyn2 = 0,
								dumpsyn3 = 0,
								dumpfin1 = 0,
								dumpfin2 = 0,
								dumpfin3 = 0,
								dumpfin4 = 0					
					}
				end
				syn_flagnum = syn_f()
				syn_flagstring = tostring(syn_flagnum)
				ack_flagnum = ack_flag_f()
				ack_flagstring = tostring(ack_flagnum)
				syn_flagnum = syn_f()
				syn_flagstring = tostring(syn_flagnum)
				ack_flagnum = ack_flag_f()
				ack_flagstring = tostring(ack_flagnum)				
 				seq_num = seq_f()
				seq_string =  tostring(seq_num)
				ack_num = ack_f()
				ack_string =  tostring(ack_num)
				frame = tostring(pinfo.number)
				
				if (syn_flagstring == "1") then
					if (ack_string == "0") then
						timetable[pinfotimetmp].syn1 = timetable[pinfotimetmp].syn1 + 1
						lastinfo.syn1 = lastinfo.syn1 + 1
						relenode, hashindex = find_reletable(reletable, pinfo, 0)
						if relenode == nil then
							add_reletable(hashtable, hashindex, pinfo, seq_num, ack_num, pinfotimetmp, 0)
						else
							timetable[pinfotimetmp].dumpsyn1 = timetable[pinfotimetmp].dumpsyn1 + 1
							lastdumpinfo.syn1 = lastdumpinfo.syn1 + 1
							relenode.syn1dump = relenode.syn1dump + 1
						end
						
						--hashindex = tostring(pinfo.src) .. tostring(pinfo.dst) .. tostring(pinfo.src_port) .. tostring(pinfo.dst_port)
						--relenode = reletable[hashindex]
						--if relenode == nil then
						--	reletable[hashindex] = {
						--		frametable = {frame},
						--		frame_len = 1,
						--		srcip = pinfo.src,
						--		dstip = pinfo.dst,
						--		srcport = pinfo.src_port,
						--		dstport = pinfo.dst_port,
						--		lastseq = seq_num,
						--		lastack = ack_num,
						--		syn1dump = 0,
						--		syn2dump = 0
						--	}
						--else
						--	timetable[pinfotimetmp].dumpsyn1 = timetable[pinfotimetmp].dumpsyn1 + 1
						--	lastdumpinfo.syn1 = lastdumpinfo.syn1 + 1
						--	relenode.frame_len = relenode.frame_len+1
						--	relenode.frametable[relenode.frame_len] = frame
						--	relenode.syn1dump = relenode.syn1dump + 1
						--end
					end
					if (ack_string == "1") then
						hashindex = tostring(pinfo.dst) .. tostring(pinfo.src) .. tostring(pinfo.dst_port).. tostring(pinfo.src_port) 
						relenode = reletable[hashindex]
						if relenode == nil then
						
						else
						
						end
					end							
				end		
			end		
		end
		
		function tap.draw(t)
			w:clear()
			local vv = {
				syn1 = 0,
				syn2 = 0,
				syn3 = 0,
				fin1 = 0,
				fin2 = 0,
				fin3 = 0,
				fin4 = 0,
				dumpsyn1 = 0,
				dumpsyn2 = 0,
				dumpsyn3 = 0,
				dumpfin1 = 0,
				dumpfin2 = 0,
				dumpfin3 = 0,
				dumpfin4 = 0				
			}
			--w:append("time" .. "\t" .. "syn1" .. "\t" ..  "syn2" .. "\t" .. "syn3" .. "\t" .. "fin1" .. "\t" .. "fin2" .. "\t" .. "fin3" .. "\t" .. "fin4" .."\n");
			--for i,v in pairs(arraynum)do
			--	w:append("seqnum:" .. "\t" .. tostring(i)  .."\n");
			--end
			--for i,v in pairs(srcinfo)do
			--	w:append("seqnum:" .. "\t" .. tostring(i)  .."\n");
			--end
			w:append("time" .. "\t" .. "syn1" .. "\t" ..  "syn2" .. "\t" .. "syn3" .. "\t" .. "fin1" .. "\t" .. "fin2" .. "\t" .. "fin3" .. "\t" .. "fin4" .. "\t" .. "totalstream" .."\n");
			for k, v in pairs(timetable) do	
				vv.syn1 = vv.syn1 + v.syn1
				vv.syn2 = vv.syn2 + v.syn2
				vv.syn3 = vv.syn3 + v.syn3
				vv.fin1 = vv.fin1 + v.fin1
				vv.fin2 = vv.fin2 + v.fin2
				vv.fin3 = vv.fin3 + v.fin3
				vv.fin4 = vv.fin4 + v.fin4
				vv.dumpsyn1 = vv.dumpsyn1 + v.dumpsyn1
				vv.dumpsyn2 = vv.dumpsyn2 + v.dumpsyn2
				vv.dumpsyn3 = vv.dumpsyn3 + v.dumpsyn3
				vv.dumpfin1 = vv.dumpfin1 + v.dumpfin1
				vv.dumpfin2 = vv.dumpfin2 + v.dumpfin2
				vv.dumpfin3 = vv.dumpfin3 + v.dumpfin3
				vv.dumpfin4 = vv.dumpfin4 + v.dumpfin4
				w:append(tostring(k) .. "\t" .. tostring(v.syn1) .. "/" .. tostring(vv.syn1) .. "\t" ..  tostring(v.syn2) .. "/" .. tostring(vv.syn2) .. "\t" .. tostring(v.syn3) .. "/" .. tostring(vv.syn3) .. "\t" .. tostring(v.fin1) .. "/" .. tostring(vv.fin1) .. "\t" .. tostring(v.fin2).. "/" .. tostring(vv.fin2) .. "\t" .. tostring(v.fin3) .. "/" .. tostring(vv.fin3) .. "\t" .. tostring(v.fin4).. "/" .. tostring(vv.fin4) .."\n");
				w:append("\t" .. tostring(v.dumpsyn1) .. "/" .. tostring(vv.dumpsyn1) .. "\t" ..  tostring(v.dumpsyn2) .. "/" .. tostring(vv.dumpsyn2) .. "\t" .. tostring(v.dumpsyn3) .. "/" .. tostring(vv.dumpsyn3) .. "\t" .. tostring(v.dumpfin1) .. "/" .. tostring(vv.dumpfin1) .. "\t" .. tostring(v.dumpfin2).. "/" .. tostring(vv.dumpfin2) .. "\t" .. tostring(v.dumpfin3) .. "/" .. tostring(vv.dumpfin3) .. "\t" .. tostring(v.dumpfin4).. "/" .. tostring(vv.dumpfin4) .."\n");
			end
			w:append("total" .. "\t" .. tostring(lastdumpinfo.syn1) .. "/" .. tostring(lastinfo.syn1) .. "\t" ..  tostring(lastdumpinfo.syn2) .. "/" .. tostring(lastinfo.syn2) .. "\t" .. tostring(lastdumpinfo.syn3) .. "/" .. tostring(lastinfo.syn3) .. "\t" .. tostring(lastdumpinfo.fin1) .. "/" .. tostring(lastinfo.fin1) .. "\t" .. tostring(lastdumpinfo.fin2).. "/" .. tostring(lastinfo.fin2) .. "\t" .. tostring(lastdumpinfo.fin3) .. "/" .. tostring(lastinfo.fin3) .. "\t" .. tostring(lastdumpinfo.fin4).. "/" .. tostring(lastinfo.fin4) .."\n");
			--for _,tap_name in pairs(Listener.list()) do
			--	w:append("tap_name :" .. tap_name .. "\n")
			--end
		end
		
		function packagedetail_show()
			w:clear()
			function tap.draw(t)
				w:clear()
				w:append("time" .. "\t" .. "syn1" .. "\t" ..  "syn2" .. "\t" .. "syn3" .. "\t" .. "fin1" .. "\t" .. "fin2" .. "\t" .. "fin3" .. "\t" .. "fin4" .."\n");
				w:append("in_detail");
			end
		end
		w:add_button("packagedetail",packagedetail_show)
		retap_packets()
	end
	register_menu("statistic/syntime", statisticsyntime, MENU_TOOLS_UNSORTED)
end
