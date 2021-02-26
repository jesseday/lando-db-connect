# Lando DB Connect

[Lando](https://lando.dev/) often changes database port connections as services are
restarted or rebuilt.  This makes connecting with a database tool like TablePlus a pain
since the connection port needs to be changed every time the application is restarted.

If you prefer to use the mysql shell, this plugin is not for you as Lando comes with a
connection command out of the box.

This plugin uses the connection information from lando to open the connection
in the tool of your choice.  It essentially runs `open mysql://user:password@127.0.0.1:port/database`.
Currently, the plugin supports mysql and postgres.


# Usage

**Clone this plugin into your `~/.lando/plugins` directory.**

* `cd ~/.lando/plugins`
* `git clone git@github.com:jesseday/lando-db-connect.git db-connect`

**Run in your lando applications**

* In a lando application
* `lando db-connect`
* lando db-connect -s [service_name]` where service name is the service with a database
connection to open.


# Notes

YMMV - This has been built with a limited use case in mind, eg my own.  I'm open to pull requests.
