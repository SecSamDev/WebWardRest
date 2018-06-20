FROM ubuntu:16.04

LABEL mantainer="Samuel Garcés"

ENV VERSION_FRAMEWORK 1.5.1 
ENV VERSION_WEBUI 0.5.12 

ENV POSTGRES_HOST postgres 
ENV POSTGRES_DATABASE arachni 
ENV POSTGRES_USERNAME arachni 
ENV POSTGRES_PASSWORD arachni 

ENV PATH /opt/arachni/bin:$PATH

ENV RPCD_ADDRESS localhost:7331


RUN apt-get update
RUN apt-get -y install \
                openssh-server \
                wget \
                curl \
                vim \
                net-tools

RUN mkdir /var/run/sshd && \
    mkdir -p /var/log/supervisor && \
    mkdir -p /etc/supervisor/conf.d

#Configure ssh
RUN echo 'root:arachni' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

#https://github.com/Arachni/arachni/releases/download/v1.5.1/arachni-1.5.1-0.5.12-linux-x86_64.tar.gz
RUN curl -L https://github.com/Arachni/arachni/releases/download/v${VERSION_FRAMEWORK}/arachni-${VERSION_FRAMEWORK}-${VERSION_WEBUI}-linux-x86_64.tar.gz |\
    tar zx &&\
    mv /arachni-${VERSION_FRAMEWORK}-${VERSION_WEBUI} /opt/arachni

# Copy database configuration
ADD database.yml /opt/arachni/system/arachni-ui-web/config/database.yml

# Copy start command
ADD arachni-grid.sh /etc/arachni-grid.sh
ADD arachni_rpc /etc/arachni_rpc
# Runable file
RUN chmod 777 /etc/arachni-grid.sh

EXPOSE 22 80 7331 9292
CMD ["/etc/arachni-grid.sh"]