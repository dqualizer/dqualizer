# dqualizer

The dqualizer repository serves as the main repository and contains elements related to all components in the dqualizer development project. An overview of the components is currently
maintained on the [organization site](https://github.com/dqualizer).

This repository currently comprises:

* A docker compose project with all dqualizer components as Docker-Images pulled from [ghcr.io](https://github.com/orgs/dqualizer/packages)
* the arc42 documentation

A more detailed description of this component's architecture is provided in
the [arc42 document](https://dqualizer.github.io/dqualizer).

## Services
| Service           | Address                |
| ----------------- | ---------------------- |
| dqanalyzer        | http://localhost:9090  |
| dqedit            | http://localhost:8070  |
| dqapi             | http://localhost:8099  |
| dqexec            | http://localhost:8090  |
| dqtanslator       | http://localhost:8080  |
| dqcockpit         | http://localhost:3030  |
| influxdb          | http://localhost:8086  |
| mongo-management  | http://localhost:8081  |
| rabbit-management | http://localhost:15672 |
| dqanalyzer        | http://localhost:9090  |

## Passwords
| Service   | Username | Password |
| --------- | -------- | -------- |
| dqcockpit | admin    | demo     |
| influxdb  | k6       | telegraf |

## How to build and run
### Docker compose
* `docker compose up` - attacted to terminal
* `docker compose up -d` - detatched from terminal
* `docker compose pull` - pull latest images

## Local development
* Clone a dqualizer repo of your choice, e.g. `https://https://github.com/dqualizer/dqapi.git`
* Change the `docker-compose.yml` to
  ```
    dqApi:
    image: ghcr.io/dqualizer/dqapi:main
    build:
      context: dqapi
      dockerfile: deployment/docker/ubuntu/Dockerfile
    container_name: 03_dqapi
    ports:
      - "${DQAPI_PORT}:8099"
    environment:
      - SPRING_RABBITMQ_HOST=rabbit
      - SPRING_DATA_MONGODB_AUTHENTICATION_DATABASE=admin
      - SPRING_DATA_MONGODB_HOST=dqdatabase
      - SPRING_DATA_MONGODB_PORT=${MONGO_PORT}
      - SPRING_DATA_MONGODB_USERNAME=root
      - SPRING_DATA_MONGODB_PASSWORD=example
      - SPRING_DATA_MONGODB_DATABASE=dqualizer
    healthcheck:
      test: wget --no-verbose --tries=1 --spider localhost:${DQAPI_PORT}/actuator/health || exit 1
      interval: 60s
      start_period: 5s
      retries: 5
      timeout: 10s
  ```

* Run `docker compose up --build --force-recreate`

## How to use the Antora Docs

For using a local directory you need to clone the repo with the documentation locally into
the [local-repos](./local-repos) folder and edit the [antora-local-playbook.yml](antora-local-playbook.yml) like in the example.

If you finished development, push the docs into the corresponding repo and add the url and the branch, if needed default is main, to the [antora-playbook.yml](antora-playbook.yml) and push to the docs branch of the dqualizer main repo.

