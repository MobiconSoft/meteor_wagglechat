Template.roomHeader.helpers({
    roomName: function() {
        return Session.get('currentRoom');
    }
});

Template.roomHeader.events({
    'click a[name=goChatMain]': function() {
        Session.set('viewMode', 'chatMain');
    }
});
