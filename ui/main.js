
var submit = document.getElementById('submit_bttn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
              } 
          }
      };
    var username = document.getElementById('username').value;
    console.log(username);
    request.open('post','http://goyalshivam1003.imad.hasura-app.io/check1',true);
    request.setRequestHeader('content-type','application/json');
    request.send(JSON.stringify({username: username}));
};