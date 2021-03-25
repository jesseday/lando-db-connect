"use strict";

const _ = require("lodash");
const exec = require("child_process").exec;

// Helper to filter services
const filterServices = (service, services = []) => {
  return !_.isEmpty(services) ? _.includes(services, service) : true;
};

module.exports = (lando) => {
  return {
    command: "db-connect",
    describe: "Open a database connection.",
    level: "app",
    options: {
      service: {
        describe: "The database service to open.  Defaults to database.",
        alias: ["s"],
        default: "database",
        boolean: false,
      },
    },
    run: (options) => {
      const app = lando.getApp(options._app.root);
      // Get services
      app.opts = !_.isEmpty(options.service)
        ? { services: options.service }
        : {};
      //   console.log(app);
      if (app) {
        return app.init().then(() => {
          const service =
            _.filter(app.info, (service) =>
              filterServices(service.service, options.service)
            )[0] || false;
          if (!service) {
            throw new Error(`Could not find the service ${options.service}`);
          }

          let {
            creds: { user, password, database },
            external_connection: { host, port },
          } = service;
          let type = false;
          if (_.includes(["mariadb", "mysql"], service.type)) {
            type = "mysql";
          } else if (service.type === "postgres") {
            type = "postgres";
          } else if (service.type === "platformsh-mariadb") {
            type = "mysql";
            let { user, path } = service.creds[0];
            database = path;
            password = "";
          }
          if (!type) {
            throw new Error(
              `Database type not yet supported by this plugin.  Could not open a connection.`
            );
          }

          exec(
            `open ${type}://${user}:${password}@${host}:${port}/${database}`
          );
        });
      }
    },
  };
};
