-- console
-- A console and a window to execute commands in lua
--
-- (c) 2006 Luis E. Garcia Ontanon <luis@ontanon.org>
--
-- Wireshark - Network traffic analyzer
-- By Gerald Combs <gerald@wireshark.org>
-- Copyright 1998 Gerald Combs
--
-- SPDX-License-Identifier: GPL-2.0-or-later


if (gui_enabled()) then 
-- This program will register a menu that will open a window with a count of occurrences
-- of every address in the capture
	local function menuable_tap()
		-- Declare the window we will use
		local tw = TextWindow.new("Address Counter")

		-- This will contain a hash of counters of appearances of a certain address
		local ips = {}

		-- this is our tap
		local tap = Listener.new();

		local function remove()
			-- this way we remove the listener that otherwise will remain running indefinitely
			tap:remove();
		end

		-- we tell the window to call the remove() function when closed
		tw:set_atclose(remove)

		-- this function will be called once for each packet
		function tap.packet(pinfo,tvb)
			local src = ips[tostring(pinfo.src)] or 0
			local dst = ips[tostring(pinfo.dst)] or 0

			ips[tostring(pinfo.src)] = src + 1
			ips[tostring(pinfo.dst)] = dst + 1 
		end

		-- this function will be called once every few seconds to update our window
		function tap.draw(t)
			tw:clear()
			for ip,num in pairs(ips) do
				tw:append(ip .. "\t" .. num .. "\n");
			end
		end

		-- this function will be called whenever a reset is needed
		-- e.g. when reloading the capture file
		function tap.reset()
			tw:clear()
			ips = {}
		end

		-- Ensure that all existing packets are processed.
		retap_packets()
	end
	
	local function infotest()
		-- Declare the window we will use
		local tw = TextWindow.new("Address Counter")

		-- This will contain a hash of counters of appearances of a certain address
		local ips = {}
		
		-- this is our tap
		local tap = Listener.new();

		local function remove()
			-- this way we remove the listener that otherwise will remain running indefinitely
			tap:remove();
		end

		-- we tell the window to call the remove() function when closed
		tw:set_atclose(remove)

		-- this function will be called once for each packet
		function tap.packet(pinfo,tvb)
			local src = ips[tostring(pinfo.src)] or 0
			local dst = ips[tostring(pinfo.dst)] or 0
			local src_port = ips[tostring(pinfo.src_port)] or 0
			local dst_port = ips[tostring(pinfo.dst_port)] or 0
			aaa = tostring(pinfo.src) .. tostring(pinfo.dst) .. tostring(pinfo.src_port) .. tostring(pinfo.dst_port)
			ips[tostring(pinfo.src)] = src + 1
			ips[tostring(pinfo.dst)] = dst + 1 
			ips[tostring(pinfo.src_port)] = src_port + 1
			ips[tostring(pinfo.dst_port)] = dst_port + 1
			srcinfo = pinfo.src
			srcportinfo = pinfo.src_port
		end

		-- this function will be called once every few seconds to update our window
		function tap.draw(t)
			tw:clear()
			
			for ip,num in pairs(ips) do
				tw:append(ip .. "\t" .. aaa .. "\t" .. type(srcinfo) .. "\t" .. type(srcportinfo) .. "\n");
			end
		end

		-- this function will be called whenever a reset is needed
		-- e.g. when reloading the capture file
		function tap.reset()
			tw:clear()
			ips = {}
		end

		-- Ensure that all existing packets are processed.
		retap_packets()
		w:add_button("test1",test11)
	end

	
	local function demo1()
		local p = ProgDlg.new("Constructing", "tacos")

		-- We have to wrap the ProgDlg code in a pcall in case some unexpected
		-- error occurs.
		local ok, errmsg = pcall(function()
				local co = coroutine.create(
						function()
								local limit = 100000
								for i=1,limit do
										print("co", i)
										coroutine.yield(i/limit, "step "..i.." of "..limit)
								end
						end
				)

				-- Whenever coroutine yields, check the status of the cancel button to determine
				-- when to break. Wait up to 20 sec for coroutine to finish.
				local start_time = os.time()
				while coroutine.status(co) ~= 'dead' do
						local elapsed = os.time() - start_time

						-- Quit if cancel button pressed or 20 seconds elapsed
						if p:stopped() or elapsed > 20 then
								break
						end

						local res, val, val2 = coroutine.resume(co)
						if not res or res == false then
								if val then
										debug(val)
								end
								print('coroutine error')
								break
						end

						-- show progress in progress dialog
						p:update(val, val2)
				end
		end)

		p:close()

		if not ok and errmsg then
				report_failure(errmsg)
		end
	end
	
	local frame = {} 
	local function statisticswithfilter(win ,filterexp)
		tap = Listener.new(nil, filterexp)
				
		function tap.packet (pinfo, tvb, tapinfo)
			len = #frame + 1
			frame[len] = pinfo.number
		end
		
		--win:append("start filter\t" .. "\n")
		function tap.draw()
			win:clear()
			for k , v  in pairs(frame)do
				win:append(tostring(k) .. "\t" .. tostring(v) .. "\n")
			end
		end

		win:append(filterexp .. "\n")
		retap_packets()
		win:append("end filter\t" .. "\n")
		--tap:remove()
	end
	
	local function capinput()
		local win = TextWindow.new("")
		win:set_editable(true)	
		local function filter()
			local label_filter = "Filter"
			local function afterfilterfunc(filterexp)
					statisticswithfilter(win, filterexp)
					--win:set(filterexp .. "\n")
			end
			new_dialog("filter", afterfilterfunc, label_filter)
		end
		
		plus = 0
		local function plusfunc()
				win:clear()
				plus = plus + 1
				t = get_filter()
				win:set(tostring(plus) .. "\t" .. t.. "\t" .. "\n")
		end	
		
		
		local function setfile()
			local label_filter = "Filepath"
			local function setFilepath(Filepath)
					filename = io.open(Filepath, "a")
					if filename == nil then
						new_dialog("file cannot open")
					end
			end
			new_dialog("setfile", setFilepath, label_filter)
		end
		
		local function savefunc()
			local text = win:get_text()
			if text ~= "" then
				if filename == nil then
					new_dialog("no file set")
					return
				end
				filename:write(text.."\n")
			else
				new_dialog("NO INPUT!!!")
			end		
		end	
		
		win:add_button("save",savefunc)
		win:add_button("setfile",setfile)
		win:add_button("filter",filter)
		win:add_button("reload", function() reload_lua_plugins() end)
		win:add_button("get_filter", function() get_filter() end)
		win:add_button("plus", plusfunc)
		win:add_button("Uppercase", function()
            local text = win:get_text()
            if text ~= "" then
                    win:set(string.upper(text))
            end
		end)
	end
	
	local function capturefile()
		print("hello")
	end
	--local function anlyze()
	--	print("hello")
	--end
	--local function packstat()
	--	print("hello")
	--end
	--local function capturefile()
	--	print("hello")
	--end
	--local function statconv()
	--	print("hello")
	--end
	--local function statendpo()
	--	print("hello")
	--end	
	--local function statres()
	--	print("hello")
	--end
	--local function rserp()
	--	print("hello")
	--end
	--local function tele()
	--	print("hello")
	--end
	--local function telansi()
	--	print("hello")
	--end
	--local function anlys()
	--	print("hello")
	--end
	local function opencapture()
		--open_capture_file("C:\Users\DELL2\Desktop\33333.pcap", "tcp.len == 0")
	end	
	-- using this function we register our function
	-- to be called when the user selects the Tools->Test->Packets menu MENU_LOG_ANALYZE_UNSORTED
	register_menu("Test/Packets", menuable_tap, MENU_TOOLS_UNSORTED)
	register_menu("Test/Packets1", infotest, MENU_TOOLS_UNSORTED)
	register_menu("Test/capinput", capinput, MENU_TOOLS_UNSORTED)
	register_menu("Test/demo1", demo1, MENU_TOOLS_UNSORTED)
	register_menu("Test/opencapture", opencapture, MENU_TOOLS_UNSORTED)
	--register_menu("Test/anlyze", anlyze, MENU_PACKET_ANALYZE_UNSORTED)
	--register_menu("Test/packstat", packstat, MENU_PACKET_STAT_UNSORTED)
	--register_menu("Test/capturefile", capturefile, MENU_STAT_GENERIC)
	--register_menu("Test/statconv", statconv, MENU_STAT_CONVERSATION_LIST)
	--register_menu("Test/statendpo", statendpo, MENU_STAT_ENDPOINT_LIST)
	--register_menu("Test/statres", statres, MENU_STAT_RESPONSE_TIME)
	--register_menu("Test/rserp", rserp, MENU_STAT_RSERPOOL )
	--register_menu("Test/tele", tele, MENU_STAT_TELEPHONY)
	--register_menu("Test/telansi", telansi, MENU_STAT_TELEPHONY_ANSI)
	--register_menu("Test/anlys", anlys, MENU_LOG_ANALYZE_UNSORTED)
end
