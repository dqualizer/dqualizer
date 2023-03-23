# dqualizer
The main repository contains elements that are related to all components. An overview of the components is currently maintained on the [organization site](https://github.com/dqualizer).   

This repository currently comprises:
* the arc42 documentation

A more detailed description of this component's architecture is provided in the [arc42 document](https://github.com/dqualizer/dqualizer/tree/main/docs/asciidoc). 

## Services
### Dashboard

Uptime Kuma is configured as a [dashboard](http://localhost:3001). Click on the respective service to see details such as the URL. Everything is hardcoded, so it needs to be updated when services are updated. 

## How to use the Antora Docs
The official docs is triggered and build by a GitHub action, just push to this branch, and it gets updated.

The [antora-playbook.yml](./antora-playbook.yml) is using the documentation which is uploaded in our Repos

For using a local directory 
