include ../../../makefile_comm/makefile.macro
 
INC = -I./ -I../include $(INC_CLIENT)  $(INC_CTLIB) $(INC_BYPROXY) $(INC_COMM_LIB) $(INC_HIREDIS) $(INC_MYSQL) $(INC_APP_PROTO)
 
#LIB =  -lz -lm $(LIB_BYPROXY) $(LIB_CTLIB) $(LIB_HIREDIS) $(LIB_MYSQL) ${LIB_APP_PROTO}
LIB =  -lz -lm -liconv $(LIB_CLIENT) $(LIB_APP_PROTO) $(LIB_BYPROXY)  $(LIB_CTLIB) $(LIB_HIREDIS) $(LIB_MYSQL)
 
BINARY = DBServer
BASEOBJS = $(patsubst ./%.cpp, ./%.o, $(wildcard ./*.cpp))
BASEOBJS += $(patsubst ./tablemodel/%.cpp, ./tablemodel/%.o, $(wildcard ./tablemodel/*.cpp))
BASEOBJS += $(patsubst ./redismodel/%.cpp, ./redismodel/%.o, $(wildcard ./redismodel/*.cpp))
BASEOBJS += $(patsubst ./command/%.cpp, ./command/%.o, $(wildcard ./command/*.cpp))
 
ifeq ($(MEMCHECK),1)
    CFLAGS += -DMEMCHECK
endif
    CXXFLAGS := $(CFLAGS)
 
#-----------------------------------------------------------
.PHONY: all clean so
 
all: $(BINARY)
 
$(BINARY): $(BASEOBJS)
    g++ $(CXXFLAGS) -o $@ $(BASEOBJS) $(LIB) -ldl
 
clean:
    rm -f $(BASESOOBJS) $(BASESO) $(BINARY) $(BASEOBJS) *.d ./tablemodel/*.d ./redismodel/*.d ./command/*.d
 
%.o: %.cpp
    g++ $(CXXFLAGS) $(INC) -fPIC -o $@ -c $<