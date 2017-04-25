
# IMAGENAME="my-hello"
# GREETING="Hello Docker!"

IMAGENAME='-DDOCKER_IMAGE="my-hello"'
GREETING='-DDOCKER_GREETING="Hello Docker!"'

# CFLAGS=-static -nostartfiles -DDOCKER_IMAGE=$(IMAGENAME) -DDOCKER_GREETING=$(GREETING)
CFLAGS=-static -nostartfiles $(IMAGENAME) $(GREETING)

CC=gcc

# gcc -o hello -static -nostartfiles hello.c
hello:	hello.c

clean:
	$(RM) hello

.phony:	clean

