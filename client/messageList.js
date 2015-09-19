Template.messageList.onCreated(function() {
    var instance = this;
    // messages 는 구독명
    instance.messageSub = instance.subscribe('messages', Session.get('currentRoom'), 30);
});

// template instance는 DOM 변경시 하기 내용을 (stop) 자동으로 호출해 준다.
// Meteor 레벨은 stop을 호출하지 않는다. 따라서 pus/sub은 template 단위 안에서 해줘야 한다.
Template.messageList.onDestroyed(function() {
    var instance = this;
    instance.messageSub.stop();
});

Template.messageList.helpers({
    messages: function() {
        return Messages.find({}, {sort:{timestamp:1}});
    }
});
