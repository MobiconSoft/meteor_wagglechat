Template.messageList.helpers({
    messages: function() {
        return Messages.find({}, {sort:{timestamp: 1}});
    }
});

Template.messageList.onCreated(function() {
    var instance = this;

    // 세션에 메세지 갯수 제한 환경값 설정
    Session.set('limit', 30);

    // messages 는 구독명
    // instance의 autorun을 하면 템플릿을 안쓸 때 자동으로 destroy로 호출해줌
    // Session limit 값이 바뀌면 다시 subscribe하고 reactivity를 전파한다.
    // 주의) this.autorun과 this.subscribe를 써야 자동 destroy를 해준다.
    instance.autorun(function() {
        instance.messagesSub = instance.subscribe('messages', Session.get('currentRoom'), Session.get('limit'));
    });

    instance.subcnt = 0;
    instance.autorun(function() {
        instance.messagesSub = instance.subscribe('messages', Session.get('currentRoom'), Session.get('limit'));
        if(instance.messagesSub.ready() && instance.subcnt === 0) {
            instance.subcnt = 1;
            $('.panel-body').scrollTop($('.chat').height() + 110);
        }
    });

    instance.autorun(function() {
        instance.roomSub = instance.subscribe('room', Session.get('currentRoom'));
        // client 쪽에 mongo가 최종 업데이트 되면 ready가 true가 된다.
        if(instance.roomSub.ready()) {
            // find는 커서가 된다. observe는 reactive를 감지한다. changed, added, reomved 이벤트가 있다.
            // observe는 서버에서도 잡을 수 있다.
            Rooms.find({_id: Session.get('currentRoom')}).observe({
                changed: function(newDoc, oldDoc) {
                    $('.panel-body').scrollTop($('.chat').height());
                }
            });
        }
    });

});

Template.messageList.onRendered(function() {
    $('.panel-body').height($(window).height() - 110);
    $(window).resize(function() {
        $('.panel-body').height($(window).height() - 110);
    });

    $('.panel-body').scroll(function() {
        if($('.panel-body').scrollTop() === 0) {
            $('.panel-body').scrollTop(30);
            Session.set('limit', Session.get('limit') + 10);
        }
    });
});

// template instance는 DOM 변경시 하기 내용을 (stop) 자동으로 호출해 준다.
// Meteor 레벨은 stop을 호출하지 않는다. 따라서 pus/sub은 template 단위 안에서 해줘야 한다.
Template.messageList.onDestroyed(function() {
    var instance = this;
    instance.messagesSub.stop();
});
