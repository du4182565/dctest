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
	--local testcout = 1
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
	
	--function add_reletable(index, , , , )
	--
	--end

	--function find_reletable(index, , , , )
	--
	--end	
	
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
			tap.remove()	
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
						hashindex = tostring(pinfo.src) .. tostring(pinfo.dst) .. tostring(pinfo.src_port) .. tostring(pinfo.dst_port)
						relenode = reletable[hashindex]
						if relenode == nil then
							reletable[hashindex] = {
								frametable = {frame},
								frame_len = 1,
								srcip = pinfo.src,
								dstip = pinfo.dst,
								srcport = pinfo.src_port,
								dstport = pinfo.dst_port,
								lastseq = seq_num,
								lastack = ack_num,
								syn1dump = 0,
								syn2dump = 0
							}
						else
							timetable[pinfotimetmp].dumpsyn1 = timetable[pinfotimetmp].dumpsyn1 + 1
							lastdumpinfo.syn1 = lastdumpinfo + 1
							relenode.frame_len = relenode.frame_len+1
							relenode.frametable[relenode.frame_len] = frame
							relenode.syn1dump = relenode.syn1dump + 1
						end
					end
					--if (ack_string == "1") then						
					--end							
				end		
			end		
		end
		
		function tap.draw(t)
			w:clear()
			--w:append("time" .. "\t" .. "syn1" .. "\t" ..  "syn2" .. "\t" .. "syn3" .. "\t" .. "fin1" .. "\t" .. "fin2" .. "\t" .. "fin3" .. "\t" .. "fin4" .."\n");
			--for i,v in pairs(arraynum)do
			--	w:append("seqnum:" .. "\t" .. tostring(i)  .."\n");
			--end
			--for i,v in pairs(srcinfo)do
			--	w:append("seqnum:" .. "\t" .. tostring(i)  .."\n");
			--end
			w:append("time" .. "\t" .. "syn1" .. "\t" ..  "syn2" .. "\t" .. "syn3" .. "\t" .. "fin1" .. "\t" .. "fin2" .. "\t" .. "fin3" .. "\t" .. "fin4" .."\n");
			for k, v in pairs(timetable) do			
				w:append(tostring(k) .. "\t" .. tostring(v.syn1) .. "/" .. tostring(lastinfo.syn1) .. "\t" ..  tostring(v.syn2) .. "/" .. tostring(lastinfo.syn2) .. "\t" .. tostring(v.syn3) .. "/" .. tostring(lastinfo.syn3) .. "\t" .. tostring(v.fin1) .. "/" .. tostring(lastinfo.fin1) .. "\t" .. tostring(v.fin2).. "/" .. tostring(lastinfo.fin2) .. "\t" .. tostring(v.fin3) .. "/" .. tostring(lastinfo.fin3) .. "\t" .. tostring(v.fin4).. "/" .. tostring(lastinfo.fin4) .."\n");
				w:append(tostring(k) .. "\t" .. tostring(v.dumpsyn1) .. "/" .. tostring(lastdumpinfo.syn1) .. "\t" ..  tostring(v.dumpsyn2) .. "/" .. tostring(lastdumpinfo.syn2) .. "\t" .. tostring(v.dumpsyn3) .. "/" .. tostring(lastdumpinfo.syn3) .. "\t" .. tostring(v.dumpfin1) .. "/" .. tostring(lastdumpinfo.syn1) .. "\t" .. tostring(v.dumpfin2).. "/" .. tostring(lastdumpinfo.syn1) .. "\t" .. tostring(v.dumpfin3) .. "/" .. tostring(lastdumpinfo.syn1) .. "\t" .. tostring(v.dumpfin4).. "/" .. tostring(lastdumpinfo.syn1) .."\n");
			end
		end
		
		function packagedetail_show()
		
		end
		w:add_button("packagedetail",packagedetail_show)
		retap_packets()
	end
	register_menu("statistic/syntime", statisticsyntime, MENU_TOOLS_UNSORTED)
end
