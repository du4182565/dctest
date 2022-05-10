if (gui_enabled()) then
	local syn_f = Field.new("tcp.flags.syn")
	local syn_package = {}
	local function statisticsyntime()
		local w = TextWindow.new("staticsyntime")
		local timearray = {}
		w:set_editable()		
		local tap = Listener.new()
		
		local function remove()
			tap.remove()	
		end
		
		w:set_atclose(remove)
		
		function tap.packet(pinfo,tvb)
			 pinfotimetmp = pinfo.rel_ts - pinfo.rel_ts%1
			 syn_package = syn_f()
			 if syn_package then
				syn_packagetmp = tostring(syn_package)
				frame = tostring(pinfo.number)
			 end
			 
			 pinfotmpp = tostring(pinfo)
			 --timep = "\t"
			 timep = tostring(pinfotimetmp)
		end
		
		function tap.draw(t)
			w:clear()
			pp = type(pinfotimetmp)
			--w:append(frame .. "\t" .. timep ..  "\t" .. tostring(syn_package)"\n");
			w:append(frame .. "\t" .. syn_packagetmp .. pp .. "\t" ..  timep .. "\n");
		end
		retap_packets()
	end
	
	local function testpinfo1()
		local w = TextWindow.new("staticpifo")
		
		w:set_editable()		
		local tap = Listener.new()
		
		local function remove()
			tap.remove()
		end
		
		w:set_atclose(remove)
		packagep = {}
		function tap.packet(pinfo,tvb)
				--if pinfo then
				packag = tostring(pinfo.number)
				--end
		end
		
		function tap.draw(t)
			--w:append(tostring(k) .. "\t" .. packagep .. "\n");
			--for k, v in pairs(packagep) do
					local framea = packag
					w:append(framea .. "\n")
			--end
			--pp = type(pinfotimetmp)
			--w:append(frame .. "\t" .. timep ..  "\t" .. tostring(syn_package)"\n");
			--w:append(frame .. "\t" .. syn_packagetmp .. pp .. "\t" ..  timep .. "\n");
		end
		retap_packets()
	end
	register_menu("statistic/pinfo1", testpinfo1, MENU_TOOLS_UNSORTED)
	--register_menu("statistic/pinfo", testpinfo, MENU_TOOLS_UNSORTED)
	register_menu("statistic/syntime", statisticsyntime, MENU_TOOLS_UNSORTED)
end
