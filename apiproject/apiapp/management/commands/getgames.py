# Install the Python Requests library:
# `pip install requests`

import base64
import requests


def send_request():
    # Request

    try:
        response = requests.get(
            url="https://api.mysportsfeeds.com/v2.1/pull/mlb/current/date/{date}/games.xml",
            params={
                "fordate": "20161121"
            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format('2ac8aad0-1217-4677-854c-83b952',MYSPORTSFEEDS).encode('utf-8')).decode('ascii')
            }
        )
        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))
    except requests.exceptions.RequestException:
        print('HTTP Request failed')