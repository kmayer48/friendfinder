var friendsArray = require('../data/friends.js');

// exporting the api routes to be usable by the server.js file.
module.exports = function (app) {

    // API GET requests. Displays all possible friends in a JSON format from the database.
    app.get('/api/friends', function (req, res) {
        res.json(friendsArray);
    });

    // API POST requests. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post('/api/friends', function (req, res) {

        // New Friend object
        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };
        // Array to hold parsed scores.
        var scoresArray = [];
        for (var i = 0; i < req.body.scores.length; i++) {
            scoresArray.push(parseInt(req.body.scores[i]))
        }
        newFriend.scores = scoresArray;

        // Check the new friend entry with the existing ones in the database.
        var scoreComparisionArray = [];
        for (var i = 0; i < friendsArray.length; i++) {

            // Check each friend's scores and sum difference in points.
            var currentComparison = 0;
            for (var j = 0; j < newFriend.scores.length; j++) {
                currentComparison += Math.abs(newFriend.scores[j] - friendsArray[i].scores[j]);
            }
            // Push each comparison between friends to array
            scoreComparisionArray.push(currentComparison);
        }

        // Determine the best match using the postion of best match in the friends array.
        var bestMatchPosition = 0;
        for (var i = 1; i < scoreComparisionArray.length; i++) {

            // Lower number in comparison difference means better match
            if (scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]) {
                bestMatchPosition = i;
            }
        }

        // If the 2 friends have the same comparison, then the newe entry in the friends array is chosen.
        var bestFriendMatch = friendsArray[bestMatchPosition];

        // Reply with a JSON object of the best match.
        res.json(bestFriendMatch);

        // Push the new friend to the friends data array for storage.
        friendsArray.push(newFriend);
    });
};