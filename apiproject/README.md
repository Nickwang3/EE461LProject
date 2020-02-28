# Django API

### Steps to run api for local testing
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

* Open [API running locally](http://127.0.0.1:8000/api/v1)

### Setting up new version of api on ec2 server
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

### View [API](http://ec2-13-59-7-216.us-east-2.compute.amazonaws.com/api/v1/)