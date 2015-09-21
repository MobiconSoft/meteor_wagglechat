Meteor.methods({
    sendMessage: function(messageObject) {
        if(Meteor.isClient) {
            messageObject["isClient"] = true;
        }

        //if(Meteor.isServer) {
            Messages.insert(messageObject);
        //}

        Rooms.update({_id: messageObject.roomId}, { $set: {lastMessageTime: messageObject.timestamp} });
    }
});
