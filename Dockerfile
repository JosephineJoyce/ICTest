FROM registry.ng.bluemix.net/ibmnode:latest
ADD . /node
WORKDIR /node
RUN npm install
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["node", "/node/app.js"]
#test