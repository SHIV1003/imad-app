
var submit = document.getElementById('submit_bttn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    console.log(username);
    request.open('post','http://http://goyalshivam1003.imad.hasura-app.io/check1',true);
    request.setRequestHeader('content-type','application/json');
    request.send(JSON.stringify({username:username}));
};