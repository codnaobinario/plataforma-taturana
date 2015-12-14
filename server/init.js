Meteor.methods({
  sendEmail: function (text) {
    this.unblock();
    Email.send({
      to: '',
      from: '',
      subject: '',
      text: text
    });
  },
  updateOrCreateFilm: function (film) {
    var f_id = film.id;
    delete film.id;
    if (film.poster_path !== ''){ poster_path: film.poster_path}
    if (film.poster_slice_path !== ''){ poster_slice_path: film.poster_slice_path}
    if (film.poster_thumb_path !== ''){ poster_thumb_path: film.poster_thumb_path}
    if (film.press_kit_path !== ''){ press_kit_path: film.press_kit_path}

    if(f_id === undefined || f_id === ''){
      Films.insert(film);
    }else{
      Films.update(f_id, {
        $set: {
          title: film.title,
          synopsis: film.synopsis,
          poster_path: film.poster_path,
          poster_slice_path: film.poster_slice_path,
          poster_thumb_path: film.poster_thumb_path,
          trailer_url: film.trailer_url,
          press_kit_path: film.press_kit_path,
          genre: film.genre,
          year: film.year,
          length: film.length,
          country: film.country,
          distributor: film.distributor,
          technical_information: film.technical_information}
      });
    }
  },
  removeFilm: function (id) {
    Films.remove(id);
  }
});

Meteor.startup(function () {

  Meteor.publish("films",function(){
      return Films.find({});
  });
 
  var name = "admin"
  var email = "admin@plataforma.taturana.com.br"
  var password = "12345678";

  if(Meteor.users.find({'emails.address':email}).count()===0){
      console.log("Creating user admin");
      Accounts.createUser({
        email: email,
        password: password,
        profile : {
          roles:['admin'],
          name: name
        }
      });
  }

  UploadServer.init({
    tmpDir: process.env.PWD + '/uploads/tmp',
    uploadDir: process.env.PWD + '/uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      return formData.contentType;
    },
    getFileName: function(fileInfo, formData) { 
      var name = fileInfo.name.replace(/\s/g, '');
      return formData.file_type + name; 
    },
    finished: function(fileInfo, formFields) {
    },
    cacheTime: 100,
    mimeTypes: {
      "xml": "application/xml",
      "vcf": "text/x-vcard"
    }
  });
});

