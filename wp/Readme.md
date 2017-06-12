# Wordpress Application

Use `docker-compose` to start, stop, and manage a complete _WordPress_
application using a _MySQL_ database for storage.

This example is taken from the _docker docs_ sample _WordPress_ application
that can be found at: https://docs.docker.com/compose/wordpress/

The docker compose file here is uses version 2 of the docker-compose
command and docker-compose YML file.

The `docker-compose.yml` file here defines 2 services and 1 volume.  The
default network is used, with the DNS resolution of servicenames to IP
addresses provided.

Services:
*  db:  MySQL database using the `db_data` volume
*  wordpress: _WordPress_ application, attaches to the `db` service at the default MySQL port 3306,and exposes port 80 as port 2112 on the host

Volumes:
*  db_data: holds the _MySQL_ database data files
