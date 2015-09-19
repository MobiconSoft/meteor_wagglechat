Template.roomList.onCreated(function() {
    // onDestroy시에 subscribe가 stop 된다.
    var self = this;
    self.roomListSub = self.subscribe("roomList");
});

Template.roomList.helpers({
    list: function() {
        // subscribe 쪽에서는 ready르 해야 완료를 받을 수 있다.
        // mini-mongo의 find 이다.
        return Rooms.find(); // return cursor
    }
});

Template.roomListItem.events({
    'click a[name=selectRoom]': function() {
        Session.set('viewMode', 'chatRoom');
        Session.set('currentRoom', this._id); // DOM에서 뒤지지 않고 this 안에 데이터가 들어있다.
        console.dir(this);
    }
});
