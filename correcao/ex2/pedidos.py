import requests
import json

token = requests.post(
    'http://clav-api.di.uminho.pt/v2/users/login',
    json = {
        'username': "rpcw2022@gmail.com", 
        'password':"2022"
    }
)
print(json.loads(token.text)['token'])

token_save = open('token.txt','w',encoding='utf8')
token_save.write(json.loads(token.text)['token'])