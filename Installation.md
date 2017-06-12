
# Install Docker

Installation of Docker is defined very well at: https://docs.docker.com/engine/installation/

If you install Docker for Windows, you may want to start a Linux image
with a docker volume for the disk.  This will avoid issues with
filesystem incompatabilities for some commands.  Just remember to attach
the named disk volume to whatever containers will need its contents.

```bash
    docker run -it --rm --name my-shell -v my-disk:/home ubuntu:xenial
```

