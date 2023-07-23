ARG nvidia_cuda_version=11.4.0-cudnn8-devel-ubuntu20.04
FROM nvidia/cuda:${nvidia_cuda_version}

RUN apt -y update && \
    apt -y upgrade && \
    apt install -y sudo

RUN useradd -m shintaro && \
    echo 'shintaro:ozaki0930' | chpasswd && \
    groupadd -g 1024 tacochan && \
    usermod -u 1024 -g 1024 -aG sudo shintaro && \
    chsh -s /bin/bash shintaro && \
    echo 'Defaults visiblepw' >> /etc/sudoers && \
    echo 'shintaro ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    mkdir /work && \
    chown -R shintaro:tacochan /work


RUN apt install -y python3 && \
    apt install -y curl && \
    apt install -y python3-pip && \
    pip3 install flask && \
    pip3 install CORS && \
    pip3 install flask_cors && \
    apt install -y build-essential && \
    apt install -y git

VOLUME ["/home/shintaro/.ssh"]

USER shintaro

CMD ["/bin/bash"]