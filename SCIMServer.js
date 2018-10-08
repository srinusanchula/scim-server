let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let db = require('./core/Database');
let out = require('./core/Logs');
let cUsers = require('./components/Users');
let cGroups = require('./components/Groups');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8081; // Support for Heroku

/**
 * GET {{baseUrl}}/scim/v2/Users
 * List users with or without a filter
 */
app.get('/scim/v2/Users', cUsers.listUsers);

/**
 * GET {{baseUrl}}/scim/v2/Users/{{userId}}
 * Get a user by ID
 */
app.get('/scim/v2/Users/:userId', cUsers.getUser);

/**
 * POST {{baseUrl}}/scim/v2/Users
 * Create a new user
 */
app.post('/scim/v2/Users', cUsers.createUser);

/**
 * PATCH {{baseUrl}}/scim/v2/Users/{{userId}}
 * Update a user's attribute
 */
app.patch('/scim/v2/Users/:userId', cUsers.patchUser);

/**
 * PUT {{baseUrl}}/scim/v2/Users/{{userId}}
 * Update a user's profile
 */
app.put('/scim/v2/Users/:userId', cUsers.updateUser);

/**
 * GET {{baseUrl}}/scim/v2/Groups
 * List users with or without a filter
 */
app.get('/scim/v2/Groups', cGroups.listGroups);

/**
 * GET {{baseUrl}}/scim/v2/Groups/{{groupId}}
 * Get a group by ID
 */
app.get('/scim/v2/Groups/:groupId', cGroups.getGroup);

/**
 * POST {{baseUrl}}/scim/v2/Groups
 * Create a new group
 */
app.post('/scim/v2/Groups', cGroups.createGroup);

/**
 * PATCH {{baseUrl}}/scim/v2/Groups/{{groupId}}
 * Update a group's attribute
 */
app.patch('/scim/v2/Groups/:groupId', cGroups.patchGroup);

/**
 * PUT {{baseUrl}}/scim/v2/Groups/{{groupId}}
 * Update a group's profile
 */
app.put('/scim/v2/Groups/:groupId', cGroups.updateGroup);

/**
 * GET {{baseUrl}}/scim/v2
 * Default SCIM endpoint
 */
app.get('/scim/v2', function (req, res) {
    res.send('SCIM');
});

let server = app.listen(port, function () {
    out.log("INFO", "ServerStartup", "Listening on port " + port);

    db.dbInit();
});