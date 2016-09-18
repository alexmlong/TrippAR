function getToken()
{
          // Put your Key and Secret here to generate token
          var key ='f9QODLTU9Vf4ftnHOrh6WxwMev0vBEeF';
          var secret ='Q5BdEWMwRVBJW5q6';
          var tok = key + ':' + secret;
          var hash = btoa(tok);
          var BasicToken= "Basic " + hash;
          $.ajax
            ({
                  type: "POST",
                  url: "https://api.pitneybowes.com/oauth/token",
                  headers: {
                              "Authorization":BasicToken
                  },
                  dataType: 'json',
                  async: false,
                  data: 'grant_type=client_credentials',
                  success: function (data){
                  alert(JSON.stringify(data));
                  },
                  error:function(data){
                                  alert(JSON.stringify(data));
                  }
           });
}
