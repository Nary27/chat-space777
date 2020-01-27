$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class=".main_chat__message_list--box">
           <div class="main_chat__message_list--box---name">
             ${message.user_name}
           </div>
           <div class="main_chat__message_list--box---date">
             ${message.created_at}
           </div>
         </div>
         <div class=".main_chat__message_list--message">
           <p class="main_chat__message_list--message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="main_chat__message_list--box">
           <div class="main_chat__message_list--box---name">
             ${message.user_name}
           </div>
           <div class="main_chat__message_list--box---date">
             ${message.created_at}
           </div>
         </div>
         <div class="main_chat__message_list--message">
           <p class="main_chat__message_list--message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main_chat__message_list').append(html);      
    $('#new_message')[0].reset();
    $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
    $('.form--send').prop('disabled', false);
    })
  .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});