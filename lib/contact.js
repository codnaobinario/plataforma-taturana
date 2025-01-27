if (Meteor.isClient) {

  Template.contact.events({
    'submit form#contact-form':function(event){

      event.preventDefault();

      var name = event.target.name.value;
      var email = event.target.email.value;
      var message = event.target.message.value;

      pidgeon = {
        to: 'contato@taturanamobi.com.br',
        from: '',
        subject: 'Contato Site',
        name: name,
        email: email,
        message: message
      };

      var mailTemplate = 'contact.html';


      Meteor.call('sendEmail', pidgeon, mailTemplate, function(err) {
        if (err){
          contactMessageError('Houve algum erro, tente enviar novamente!',err.reason);
        }
        else{
          contactMessageError('Sua mensagem foi enviada com sucesso!');
        }
      });

    }
  });
}

function contactMessageError(message,reason) {
  if (reason){
    alert = message;
  }
  else{
    alert = message;
  }
  $(".form-errors").append(alert);
  $('html, body').animate({ scrollTop: 0 }, 'fast');
}
