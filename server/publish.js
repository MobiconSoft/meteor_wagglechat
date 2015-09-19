Meteor.publish("roomList", function () {
  // 이안을 다른 것의 데이터를 added 하면 mini-mongo로 간다.
  return Rooms.find();
});
