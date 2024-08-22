$CONTAINER_APP1 = "app1"
$CONTAINER_APP2 = "app2"
$CONTAINER_APP1_ID = (docker ps -a -q -f name=$CONTAINER_APP1)
$CONTAINER_APP2_ID = (docker ps -a -q -f name=$CONTAINER_APP2)

$IMAGE_NAME = "wtlee1871/ggi-web:latest"


if ($CONTAINER_APP1_ID) {
	docker stop $CONTAINER_APP1_ID
	docker rm -f $CONTAINER_APP1_ID
}
if ($CONTAINER_APP2_ID) {
	docker stop $CONTAINER_APP2_ID
	docker rm -f $CONTAINER_APP2_ID
}

docker run -d --name $CONTAINER_APP1 -p 3001:3000 $IMAGE_NAME
docker run -d --name $CONTAINER_APP2 -p 3002:3000 $IMAGE_NAME