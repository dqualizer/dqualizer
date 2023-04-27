# dqualizer
The main repository contains elements that are related to all components. An overview of the components is currently maintained on the [organization site](https://github.com/dqualizer).   

This repository currently comprises:

* the arc42 documentation


## Services
### Dashboard

Uptime Kuma is configured as a [dashboard](http://localhost:3001). Click on the respective service to see details such as the URL. Everything is hardcoded, so it needs to be updated when services are updated. 

A more detailed description of this component's architecture is provided in
the [arc42 document](https://github.com/dqualizer/dqualizer/tree/main/docs/asciidoc).

## How to use the Antora Docs

For using a local directory you need to clone the repo with the documentation locally into
the [local-repos](./local-repos) folder and edit the [antora-local-playbook.yml](antora-local-playbook.yml) like in the
example

If you finished development, push the docs into the corresponding repo and add the url and the branch, if needed default is main, to
the [antora-playbook.yml](antora-playbook.yml) and push to the docs branch of the dqualizer main repo
