FROM ubuntu:24.04

ARG RUNNER_VERSION="2.319.1"
ARG TOMCAT_VERSION="9.0.93"

# Prevents installdendencies.sh from prompting the user and blocking the image creation
ARG DEBIAN_FRONTEND=noninteractive

RUN apt update -y && apt upgrade -y && useradd -m docker
RUN apt install -y --no-install-recommends \
    curl \
    jq \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3 \
    python3-venv \
    python3-dev \
    python3-pip \
    openjdk-21-jdk \
    ant

RUN cd /home/docker && mkdir actions-runner && cd actions-runner \
    && curl -O -L https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz \
    && tar xzf ./actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz

RUN chown -R docker ~docker && /home/docker/actions-runner/bin/installdependencies.sh

COPY start.sh start.sh

# make the script executable
RUN chmod +x start.sh

RUN cd / &&  mkdir -p /datadrive/deployment/develop \
    && mkdir -p /datadrive/deployment/master \
    && cd datadrive \
    && chown -R docker:docker /datadrive/deployment


# Install Tomcat
RUN curl -O -L https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.93/bin/apache-tomcat-9.0.93.tar.gz \
    && tar xzvf apache-tomcat-9.0.93.tar.gz \
    && mv apache-tomcat-9.0.93 tomcat \
    && rm apache-tomcat-9.0.93.tar.gz

# Set environment variables for Tomcat
ENV CATALINA_HOME /datadrive/tomcat
ENV PATH $CATALINA_HOME/bin:$PATH

# since the config and run script for actions are not allowed to be run by root,
# set the user to 'docker' so all subsequent commands are run as the docker user
USER docker

ENTRYPOINT [ "./start.sh" ]
