Template.message.helpers({
    usr: function() {
        return Meteor.userId() === this.owner ? '나' : this.username;
    },
    gravatar: function() {
        return "http://www.gravatar.com/avatar/" + Gravatar.hash(this.email) + "?s=45&d=wavatar";
    },
    me: function() {
        return Meteor.userId() === this.owner;
    }
});
