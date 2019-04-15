# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.

vm_name = "modelCanvas"
is_proxy = true

Vagrant.configure("2") do |config|
  
  config.vm.box = "ubuntu/bionic64" # server v18.04
  config.vm.define vm_name
  config.vm.hostname = vm_name
  config.vm.box_check_update = false

  if Vagrant.has_plugin?("vagrant-proxyconf") && is_proxy
    config.proxy.http     = "http://v221d696.prevnet:8080/"
    config.proxy.https    = "http://v221d696.prevnet:8080/"
    config.apt_proxy.http = "http://v221d696.prevnet:8080/"
    config.apt_proxy.https = "http://v221d696.prevnet:8080/"
  end

  # Mapeamento das portas guest e host
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 3100, host: 3100
  config.vm.network "forwarded_port", guest: 80, host: 8080
  

  # configuracoes gerais da maquina
  config.vm.provider "virtualbox" do |vb|
    # vb.gui = true
    vb.memory = "4096"
    vb.cpus = 2
    vb.name = vm_name
  end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "ansible_local" do |ansible|
    ansible.become = true
    ansible.playbook = "/vagrant/playbooks/main.yaml"
  end
  # config.vm.provision "shell", inline: <<-SHELL
  #   mkdir -p /tmpchain/bcnpj
  #   mkdir -p /pm2
  # SHELL
  # config.vm.provision "shell", privileged: false, inline: <<-SHELL
  #   curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
  #   source ~/.bashrc && nvm install node
  # SHELL
end