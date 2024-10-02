project_root=$(pwd)

docker run -d -p 6000:5000 --restart=always --name registry registry:2

cd ./kubernetes-configs
docker tag chat-application-api-gateway localhost:6000/chat-application-api-gateway
docker tag chat-application-sql-server.configurator localhost:6000/chat-application-sql-server.configurator
docker tag chat-application-identity-api localhost:6000/chat-application-identity-api
docker tag chat-application-conversation-api localhost:6000/chat-application-conversation-api

docker push localhost:6000/chat-application-api-gateway
docker push localhost:6000/chat-application-identity-api
docker push localhost:6000/chat-application-conversation-api
docker push localhost:6000/chat-application-sql-server.configurator

# Declare secret
cd "$project_root"
echo -e ""
kubectl delete secret general-secret \
api-gateway-secret \
identity-api-secret \
conversation-api-secret
echo -e ""

kubectl create secret generic general-secret --from-env-file=.env.production
kubectl create secret generic api-gateway-secret --from-env-file=./solutions/APIGatewaySolution/src/APIGateway/.env
kubectl create secret generic identity-api-secret --from-env-file=./solutions/IdentitySolution/DuendeIdentityServer/.env
kubectl create secret generic conversation-api-secret --from-env-file=./solutions/ConversationSolution/src/ConversationService.API/.env
echo -e ""

cd ./kubernetes-configs
# kubectl apply -f sql-server-deployment.yaml \
# -f sql-server-service.yaml \
# -f api-gateway-deployment.yaml \
# -f api-gateway-service.yaml \
# -f identity-api-deployment.yaml \
# -f identity-api-service.yaml \
# -f rabbitmq-cm0-configmap.yaml \
# -f rabbitmq-deployment.yaml \
# -f rabbitmq-service.yaml

kubectl apply -f deployments \
-f services

# kubectl apply -f .
