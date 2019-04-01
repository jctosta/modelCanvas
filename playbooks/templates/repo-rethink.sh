#!/bin/bash
source /etc/lsb-release && cat > /etc/apt/sources.list.d/rethinkdb.list << EOF
deb http://download.rethinkdb.com/apt bionic main
EOF
wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
sudo apt-get update