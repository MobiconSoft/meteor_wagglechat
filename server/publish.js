Meteor.publish("roomList", function () {
  // 이안을 다른 것의 데이터를 added 하면 mini-mongo로 간다.
  return Rooms.find();
});

// message list
Meteor.publish("messages", function(roomId, count){
    if(!roomId) {
        console.log('채팅방 식별자 부재', count);
        return [];
    } else {
        return Messages.find({roomId: roomId}, {sort: {timestamp: -1}, limit: count});
    }
});

Meteor.publish('room', function(roomId) {
    return Rooms.find({_id: roomId} );
})
