// 전역 helper를 등록한다.
Template.registerHelper("currentMode", function(argument) {
    // reactivity 됨
    if(!Session.get('viewMode')) {
        Session.set('viewMode', 'chatMain');
    }
    return Session.get('viewMode');
});

Meteor.startup(function () {
   moment.locale('kr', {
       relativeTime : {
           future: "in %s",
           past:   "%s",
           s:  "몇 초",
           m:  "일분",
           mm: "%d 분",
           h:  "한시간",
           hh: "%d 시간",
           d:  "하루",
           dd: "%d 일",
           M:  "한달",
           MM: "%d 개월",
           y:  "일년",
           yy: "%d 년"
       }
   });

   Session.set('localtime', 1);
   Meteor.Match.setTimeout(function() {
        Session.set('localtime', Random.id());
   }, 1000);
});

Template.registerHelper("ago", function(timestamp){
    return Session.get('localtime') && moment(timestamp).fromNow();
});
