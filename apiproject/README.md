# Django API

<!-- ### Steps to run api for local testing
* Create python virtual env in this directory
```bash
$ pip3 install virtualenv

$ virtualenv env

$ source env/bin/activate
```

* Install django modules
```bash
$ pip3 -r install requirements.txt
```

* Run api locally
```bash
$ python3 manage.py runserver
```

* Open [API running locally](http://127.0.0.1:8000/api/v1) -->

<!-- ### Setting up new version of api on ec2 server
* ssh into ec2 instance (endpoint in ec2 console)

* Clone the Repository

* Create python virtual env in this directory
```bash
$ pip3 install virtualenv

$ virtualenv env

$ source env/bin/activate
```

* Install django modules
```bash
$ pip3 -r install requirements.txt
```

* Make and execute migrations if changes occurred to database
```bash
$ python3 manage.py makemigrations
$ python3 manage.py migrate
```

* Collect static files
```bash
$ python3 manage.py collectstatic --settings=apiproject.settings.prod
```

* Run apache2 server on ec2

```bash
$ sudo service apache2 restart
```

* Check status of server on ec2

```bash
$ sudo systemctl status apache2
```

### View [API](http://ec2-13-59-7-216.us-east-2.compute.amazonaws.com/api/v1/) -->


# Using docker-compose to run locally

### install docker and docker-compose

* install docker [here](https://docs.docker.com/install/)

* install docker compose [here](https://docs.docker.com/compose/install/)

### launch django app using docker-compose

```bash
$ sudo docker-compose up
```
* open [API running locally](http://127.0.0.1:8000/api/v1)

### run manage.py command

```bash
$ sudo docker-compose run app python3 manage.py <name of cmd>
```

# Creating datascraping scripts

* navigate to apiapp/management/commands directory

* add new python file in directory (the name of this new file is the command name)

* use link for reference [django-docs](https://docs.djangoproject.com/en/3.0/howto/custom-management-commands/)

* when finished with command, run locally

```bash
$ sudo docker-compose run app python3 manage.py <name of cmd>
```

* Note - these commands will only change your local instance, not the production one

# Adding/Changing Models

* when changing a model in models.py, some commands will have to be run to update the database

* make the database migrations

```bash
$ sudo docker-compose run app python3 manage.py makemigrations
```

* apply the migrations 

```bash
$ sudo docker-compose run app python3 manage.py migrate
```

