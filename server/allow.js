Rooms.allow( {
  insert: function(userId, doc) {
    // doc is insert documnet of mongodb
    return (userId && doc.owner === userId);
  }
})
