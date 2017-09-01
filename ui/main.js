console.log('Loaded!');
var submit = document.getElementById('submit_bttn');
submit.onclick = function(){
    var username = document.getElememntById('username').value;
    console.log(username);
    request.open('post','http://http://goyalshivam1003.imad.hasura-app.io/check1',true);
    request.sendRequestHeader('content-type','application/json');
    request.send(JSON.stringify({username:username}));
};