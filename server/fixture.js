Meteor.startup(function() {
  if (!Rooms.findOne({
      _id: "MeteorSchool"
    })) {
    // fixture data
    var usr1 = Accounts.createUser({
      username: "waggle",
      email: "waggle@gmail.com",
      password: "12345678"
    });
    var usr2 = Accounts.createUser({
      username: "waggle2",
      email: "waggle2@gmail.com",
      password: "12345678"
    });

    Rooms.insert({
      _id: "MeteorSchool",
      name: "MeteorSchool",
      owner: usr1,
      userList: [usr1, usr2],
      createdAt: (new Date()).getTime()
    });
  }
})
