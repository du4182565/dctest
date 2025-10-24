#!/bin/bash
# --------------------------------------------
# 导出当前机器上所有容器的 docker run 启动命令
# 不执行，只生成启动命令
# 结果输出到：docker_run_cmds.sh
# --------------------------------------------

OUTPUT="docker_run_cmds.sh"
echo "#!/bin/bash" > "$OUTPUT"
echo "# 导出于 $(date)" >> "$OUTPUT"
echo "" >> "$OUTPUT"

for CID in $(docker ps -a -q); do
  NAME=$(docker inspect -f '{{.Name}}' $CID | sed 's/^\/\(.*\)/\1/')
  IMAGE=$(docker inspect -f '{{.Config.Image}}' $CID)
  NETWORK=$(docker inspect -f '{{.HostConfig.NetworkMode}}' $CID)
  RESTART=$(docker inspect -f '{{.HostConfig.RestartPolicy.Name}}' $CID)

  # 环境变量
  ENVS=$(docker inspect -f '{{range .Config.Env}}-e "{{.}}" {{end}}' $CID)

  # 挂载卷
  VOLUMES=$(docker inspect -f '{{range .Mounts}}-v {{.Source}}:{{.Destination}} {{end}}' $CID)

  # 端口映射
  PORTS=$(docker inspect -f '{{range $p, $conf := .HostConfig.PortBindings}}{{range $conf}}-p {{.HostPort}}:{{$p}} {{end}}{{end}}' $CID)

  # 启动命令和入口
  ENTRYPOINT=$(docker inspect -f '{{json .Config.Entrypoint}}' $CID | tr -d '[]"')
  CMD=$(docker inspect -f '{{json .Config.Cmd}}' $CID | tr -d '[]"')

  echo "# 容器: $NAME" >> "$OUTPUT"
  echo -n "docker run -d " >> "$OUTPUT"
  echo -n "--name $NAME " >> "$OUTPUT"
  [ -n "$NETWORK" ] && echo -n "--network $NETWORK " >> "$OUTPUT"
  [ -n "$RESTART" ] && [ "$RESTART" != "no" ] && echo -n "--restart=$RESTART " >> "$OUTPUT"
  echo -n "$PORTS" >> "$OUTPUT"
  echo -n "$VOLUMES" >> "$OUTPUT"
  echo -n "$ENVS" >> "$OUTPUT"
  echo "$IMAGE $ENTRYPOINT $CMD" >> "$OUTPUT"
  echo "" >> "$OUTPUT"
done

chmod +x "$OUTPUT"

echo "✅ 所有容器启动命令已导出到: $OUTPUT"

