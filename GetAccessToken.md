# How to get the Access token
- Open the abobot project here https://developers.facebook.com/apps/
- Go to the settings/basic page
- You will need:
- the App id
- the App secret
- Run the following command to get the access token

```sh
curl -X GET "https://graph.facebook.com/oauth/access_token?client_id={your-app-id}&client_secret={your-app-secret}&grant_type=client_credentials"
```