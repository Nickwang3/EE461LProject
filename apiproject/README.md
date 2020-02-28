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

* Open [link to api running locally](http://127.0.0.1:8000/api/v1)