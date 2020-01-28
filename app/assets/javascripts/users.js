$(function() {
  function addUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
      `;
      $("#user-search-result").append(html);
    }
    
    
    function addNoUser() {
      var html = `
      <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
      `;
      $("#user-search-result").append(html);
    }
    
    function addChatMember(name,id){
      var html = `
      <div class="chat-group-user clearfix">
      <input name='group[user_ids][]' type='hidden' value=${id}>  
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>
      `;
      $("#chat-group-users").append(html);
  }


  $(document).on("click",".user-search-remove",function(){
    $(this).parent().remove();
  });


  $(document).on("click",".user-search-add",function(){
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    addChatMember(user_name,user_id);
    $(this).parent().remove();

  });

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
});

