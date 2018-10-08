# Scim-Server
Sample SCIM server written in NodeJS that supports Users and Groups (with group memberships!). This can be used in conjunction with any SCIM application to test SCIM capabilities.

## Prerequisites
As a prerequisite, [NodeJS](https://nodejs.org/en/) and npm (comes with NodeJS) needs to be installed.

## Checkout the Server & Install packages
Checkout the server from this repo.

The project contains a `package.json` file that npm can use to install dependencies. To do this, follow these steps:

1\. Open Command Prompt (or Terminal)

2\. `cd` to the place where you extracted this project

3\. `npm install` in the folder where the `package.json` file is located

## Run Srever (Test using Postman)
Once all above is install successfully, run the node server using command "node SCIMServer.js". Make the following calls from any REST Clients like Postman or cURL).

Note: Server starts with default port 8081.

__IMPORTANT: All requests must contain the following two headers:__
```json
Accept: application/scim+json
Content-Type: application/scim+json
```
Test the server using Postman:
You can get the collection for the supported actions by clicking [this link](https://www.getpostman.com/collections/0a38ba3aa0383bb9dc4f).

__IMPORTANT: If you change the body type to JSON, Postman will reset the `Content-Type` header to `application/json` and your calls will fail.__

Note: [ngrok](https://ngrok.com/) "ngrok http 8081" can be used to make server available online. use https://xxxxx.ngrok.io in SCIM app or Runscope to test online.

## Users endpoint

1\. Create User (POST to {SCIM Base Url}/Users)


2\. Get Users (GET to {SCIM Base Url}/Users)


3\. Get User By Id (GET to {SCIM Base Url}/Users/:UserId)


4\. Deactivate User (PATCH to {SCIM Base Url}/Users/:UserId)


5\. Modify/Update User (PUT to {SCIM Base Url}/Users/:UserId)

## Groups endpoint

1\. Create Group (POST to {SCIM Base Url}/Groups)

2\. Get Groups (GET to {SCIM Base Url}/Groups)

3\. Get Group By Id (GET to {SCIM Base Url}/Groups/:GroupId)

4\. Modify Group Name (PATCH to {SCIM Base Url}/Groups/:GroupId)

5\. Update Group (PUT to {SCIM Base Url}/Groups/:GroupId)

# Running and Testing the Server


## Requests

### Users

1\. POST {SCIM_Base_Url}/scim/v2/Users

```json
{  
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "userName": "username@example.com",
  "name":
  {  
    "givenName": "<GivenName>",
    "middleName": "undefined",
    "familyName": "<FaimlyName>"
  },
  "emails":
  [{
    "primary": true,
    "value": "username@example.com",
    "type": "work"
  }],
  "displayName": "<display name>",
  "externalId": "<externalId>",
  "groups": [],
  "active": true
}
```

2\. GET {SCIM_Base_Url}/scim/v2/Users?count=2&startIndex=1

3\. GET {SCIM_Base_Url}/scim/v2/Users?count=1&filter=userName eq "username@example.com"&startIndex=1

4\. PUT {SCIM_Base_Url}/scim/v2/Users/<UserID>

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "id": "a5222dc0-4dec-11e6-866c-5b600f3e2809",
  "userName": "username@example.com",
  "name":
  {
    "givenName": "<GivenName>",
    "middleName": "undefined",
    "familyName": "<FamilyName>"
  },
  "active": "true",
  "meta":
  {
    "resourceType": "User",
    "location": "<location uri>"
  },
  "emails":
  [{
    "primary": true,
    "type": "work",
    "value": "username@example.com"
  }],
  "displayName": "<display Name>",
  "externalId": "<externalId>",
  "groups": []
}
```
5\. PATCH {SCIM_Base_Url}/scim/v2/Users/<UserID>
```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations":
  [{
    "op": "replace",
    "value": { "active":true }
  }]
}
```

### Groups

1\. POST {SCIM_Base_Url}/scim/v2/Groups
```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "displayName": "Test Group 1",
  "members":
  [{
    "value": "<UserID>",
    "$ref": "<UserSCIMLocation>",
    "display": "First Last"
  }]
}
```

2\. GET {SCIM_Base_Url}/scim/v2/Groups?count=2&startIndex=1

3\. GET {SCIM_Base_Url}/scim/v2/Groups?count=1&startIndex=1&filter=displayName eq Test Group 1

4\. PUT {SCIM_Base_Url}/scim/v2/Groups/<GroupID>
```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "id": "<GroupID>",
  "displayName": "<DisplayName>",
  "members":
  [{
    "value": "<UserID>",
    "$ref": "<UserSCIMLocation>",
    "display": "First Last"
  }]
}
```

5\. PATCH {SCIM_Base_Url}/scim/v2/Groups/<GroupID>
```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations":
  [{
    "op": "replace",
    "value": { "displayName":"Test" }
  }]
}
```