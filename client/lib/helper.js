// 전역 helper를 등록한다.
Template.registerHelper("currentMode", function(argument) {
    // reactivity 됨
    if(!Session.get('viewMode')) {
        Session.set('viewMode', 'chatMain');
    }
    return Session.get('viewMode');
});
