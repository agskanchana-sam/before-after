
let loginBTN  = document.querySelector("#loginBtn");


function showPreloader(){
    document.querySelector(".login-progress").style.display = 'block';
    loginBTN.setAttribute('disabled');
}

function hidePreloader(){
    document.querySelector(".login-progress").style.display = 'none';
    loginBTN.removeAttribute("disabled");
}


function getToken(username,password){

    $.ajax({
        url: RESTROOT + 'jwt-auth/v1/token',
        method: "POST",
        data: {
            'username': username,
            'password': password
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 0) {
                // Errormsg = "Connection Error";
                hidePreloader();
                ons.notification.alert('Connection Error');
            }

        }
    })

    .done(function(response){
        // console.log(response);
        hidePreloader();
         sessionStorage.setItem('loginToken', response.token);
         sessionStorage.setItem('userName', response.user_display_name);
         window.location.href = 'home.html';
         
    })

    .fail(function(response){
        
        console.log(response.responseJSON.code);
        console.log(response);
        hidePreloader();
        // $(".preloader").hide();

       

        if(response.responseJSON.code == '[jwt_auth] incorrect_password'){
            // Errormsg = "Incorrect Password";
            ons.notification.alert('Incorrect Password');
        }else{
            // Errormsg = response.responseJSON.message;
            ons.notification.alert(response.responseJSON.message);
        }

        // $(".error_msg").html(Errormsg);

        // $("#ErrorModal").modal("show");

    })

 }
 
 
 
 
 
 
 
 loginBTN.addEventListener("click", function(){

    console.log('clicked');
    showPreloader();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    //ons.notification.alert('Incorrect username or password.');

    getToken(username,password);
  
  
   });



 





  
     
    