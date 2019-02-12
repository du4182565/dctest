int g_chkre;
static int s_argc;
static char **s_argv;

int chk_param(int argc, char *argv[]){
    if(argc < MIN_PARAM_NUM)
    {
        return 0;
    }
    else
    {
        return 1;
    }
}
