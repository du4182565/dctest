if (gui_enabled()) then
	local ipproto_f = Field.new("ip.proto")
	local syn_f = Field.new("tcp.flags.syn")
	local ack_flag_f = Field.new("tcp.flags.ack")
	local seq_f = Field.new("tcp.seq")
	local ack_f = Field.new("tcp.ack")
	local ack_flag_f = Field.new("tcp.flags.ack")
	local ack_flag_f = Field.new("tcp.flags.ack")
	local testnum  = 22
	local timetable  = {}
	local syn1location = 0
	local syn2location = 1
	local syn3location = 2
	local fin1location = 3
	local fin2location = 4
	local fin3location = 5
	local fin4location = 6 
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
	local connecttable = {}
	local testcout = 1
	local srcinfo = {}
	local lastinfo = {
			syn1 = 0,
			syn2 = 0,
			syn3 = 0,
			conn = 0,
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
	
	function add_reletable(hashtable, index, pinfo, seq_num, ack_num, timeq, dir)
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
								conn = 0,
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
							add_reletable(reletable, hashindex, pinfo, seq_string, ack_string, pinfotimetmp, 0)
						else
							timetable[pinfotimetmp].dumpsyn1 = timetable[pinfotimetmp].dumpsyn1 + 1
							lastdumpinfo.syn1 = lastdumpinfo.syn1 + 1
							relenode.syn1dump = relenode.syn1dump + 1
						end
					end
					if (ack_string == "1") then
						timetable[pinfotimetmp].syn2 = timetable[pinfotimetmp].syn2 + 1
						lastinfo.syn2 = lastinfo.syn2 + 1
						relenode, hashindex = find_reletable(reletable, pinfo, 0)
						if relenode == nil then
							add_reletable(reletable, hashindex, pinfo, seq_string, ack_string, pinfotimetmp, 0)
						else
							if(relenode.acktable[2] == ack_string)
							then
									timetable[pinfotimetmp].dumpsyn2 = timetable[pinfotimetmp].dumpsyn2 + 1
									lastdumpinfo.syn2 = lastdumpinfo.syn2 + 1
									relenode.syn2dump = relenode.syn2dump +	1
							elseif(relenode.seqtable[1] == "0")
							then
									if relenode.acktable[1] == "0" then
										lastinfo.syn1 = lastinfo.syn1 - 1
									end									
							end
							testnum = 444
							relenode.seqtable[2] = seq_string
							relenode.acktable[2] = ack_string
						end
					end							
				end	
				if(seq_string == "1")then
					if(ack_string == "1")then
						timetable[pinfotimetmp].syn3 = timetable[pinfotimetmp].syn3 + 1
						lastinfo.syn3 = lastinfo.syn3 + 1
						relenode, hashindex = find_reletable(reletable, pinfo, 0)
						if relenode == nil then
							add_reletable(reletable, hashindex, pinfo, seq_string, ack_string, pinfotimetmp, 0)
						else
							if(relenode.acktable[3] == "1")
							then
									if (relenode.seqtable[3] == "1")then
										timetable[pinfotimetmp].dumpsyn3 = timetable[pinfotimetmp].dumpsyn3 + 1
										lastdumpinfo.syn3 = lastdumpinfo.syn3 + 1										
									end	
							elseif(relenode.acktable[2] == "1")
							then
								lastinfo.syn2 = lastinfo.syn2 - 1
								timetable[pinfotimetmp].conn = timetable[pinfotimetmp].conn + 1
								lastinfo.conn = lastinfo.conn + 1
								testnum = 333
							end 
							relenode.seqtable[3] = seq_string
							relenode.acktable[3] = ack_string	
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
				conn = 0,
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
			w:append("time" .. "\t" .. "syn1" .. "\t" ..  "syn2" .. "\t" .. "syn3".. "\t" .. "conn" .. "\t" .. "fin1" .. "\t" .. "fin2" .. "\t" .. "fin3" .. "\t" .. "fin4" .. "\t" .. "totalstream" .."\n");
			for k, v in pairs(timetable) do	
				vv.syn1 = vv.syn1 + v.syn1
				vv.syn2 = vv.syn2 + v.syn2
				vv.syn3 = vv.syn3 + v.syn3
				vv.conn = vv.conn + v.conn
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
				w:append(tostring(k) .. "\t" .. tostring(v.syn1) .. "/" .. tostring(vv.syn1) .. "\t" ..  tostring(v.syn2) .. "/" .. tostring(vv.syn2) .. "\t" .. tostring(v.syn3) .. "/" .. tostring(vv.syn3).. "\t" .. tostring(v.conn) .. "/" .. tostring(vv.conn) .. "\t" .. tostring(v.fin1) .. "/" .. tostring(vv.fin1) .. "\t" .. tostring(v.fin2).. "/" .. tostring(vv.fin2) .. "\t" .. tostring(v.fin3) .. "/" .. tostring(vv.fin3) .. "\t" .. tostring(v.fin4).. "/" .. tostring(vv.fin4) .."\n");
				w:append("\t" .. tostring(v.dumpsyn1) .. "/" .. tostring(vv.dumpsyn1) .. "\t" ..  tostring(v.dumpsyn2) .. "/" .. tostring(vv.dumpsyn2) .. "\t" .. tostring(v.dumpsyn3) .. "/" .. tostring(vv.dumpsyn3).. "\t" .. "\t" .. tostring(v.dumpfin1) .. "/" .. tostring(vv.dumpfin1) .. "\t" .. tostring(v.dumpfin2).. "/" .. tostring(vv.dumpfin2) .. "\t" .. tostring(v.dumpfin3) .. "/" .. tostring(vv.dumpfin3) .. "\t" .. tostring(v.dumpfin4).. "/" .. tostring(vv.dumpfin4) .."\n");
			end
			w:append("total" .. "\t" .. tostring(lastdumpinfo.syn1) .. "/" .. tostring(lastinfo.syn1) .. "\t" ..  tostring(lastdumpinfo.syn2) .. "/" .. tostring(lastinfo.syn2) .. "\t" .. tostring(lastdumpinfo.syn3) .. "/" .. tostring(lastinfo.syn3).. "\t" .. "-" .. "/" .. tostring(lastinfo.conn) .. "\t" .. tostring(lastdumpinfo.fin1) .. "/" .. tostring(lastinfo.fin1) .. "\t" .. tostring(lastdumpinfo.fin2).. "/" .. tostring(lastinfo.fin2) .. "\t" .. tostring(lastdumpinfo.fin3) .. "/" .. tostring(lastinfo.fin3) .. "\t" .. tostring(lastdumpinfo.fin4).. "/" .. tostring(lastinfo.fin4) .."\n");
			--for _,tap_name in pairs(Listener.list()) do
			--	w:append("tap_name :" .. tap_name .. "\n")
			--end
			
			--w:append("testnum :" .. teststring1 .. "\t" ..teststring2 .. "\t" .. "\n")
		end
		
		function packagedetail_show()
			w:clear()
			function tap.draw(t)
				w:clear()
				for k,v in pairs(reletable) do
					--w:append(k .. type(v.timel) .. type(v.seqtable).. type(v.acktable).. type(v.frame_len)..type(v.srcip)..type(v.dstip)..type(v.srcport).. teststring .."\n");
				end
			end
		end
		w:add_button("packagedetail",packagedetail_show)
		retap_packets()
	end
	register_menu("statistic/syntime", statisticsyntime, MENU_TOOLS_UNSORTED)
end
