class User  {
    static parseFromSCIMResource(userJsonData) {
        let user = {
            "active": false,
            "userName": "",
            "givenName": "",
            "middleName": "",
            "familyName": "",
            "email": "",
            "groups": []
        };

        user["active"] = userJsonData["active"];
        user["userName"] = userJsonData["userName"];
        user["givenName"] = userJsonData["name"]["givenName"];
        user["middleName"] = userJsonData["name"]["middleName"];
        user["familyName"] = userJsonData["name"]["familyName"];
        user["email"] = userJsonData["emails"][0]["value"];

        let groups = [];

        for (let i = 0; i < userJsonData["groups"].length; i++) {
            groups.push(this.parseGroups(userJsonData["groups"][i]));
        }

        user["groups"] = groups;

        return user;
    }

    static parseGroups(userGroupJsonData) {
        let group = {
            "value": null,
            "ref": null,
            "display": null
        };

        group["value"] = userGroupJsonData["value"];
        group["ref"] = userGroupJsonData["$ref"];
        group["display"] = userGroupJsonData["display"];

        return group;
    }

    static createGroup(groupId, displayName) {
        let group = {
            "value": null,
            "$ref": null,
            "display": null
        };

        group["value"] = groupId;
        group["$ref"] = "../Groups/" + groupId;
        group["display"] = displayName;

        return group;
    }
}

module.exports = User;