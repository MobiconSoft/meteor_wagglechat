Template.roomList.onCreated(function () {
  // onDestroy시에 subscribe가 stop 된다.
  var self = this;
  self.roomListSub = self.subscribe("roomList");
});

Template.roomList.helpers({
  list: function () {
    return Rooms.find();
  }
});
