FROM centos:centos6

# Enable EPEL for Node.js
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

# Install Node.js and npm
RUN yum install -y npm
RUN yes | yum install mysql-server

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

EXPOSE  3000

CMD ./installer.sh
