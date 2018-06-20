# ArachniGrid

### Motivation
The ArachniGrid is intended to be used by all the Pipeline cluster nodes directly calling it.
This is the simples method with the lowest "overhead". 


### Usage
Launch as many instances of ArachniGrid as you like, then connect to any of them via ssh and launch arachni_rpc commands to the local grid.

### Docker Build

```
docker build -t secsamdev/arachni-grid .
```