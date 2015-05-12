$(function () {
var validateUserModel = Backbone.Model.extend({}); 
var getUserId = Backbone.View.extend({
     el: $("#block"),
     events : {
        "click #getUserId" : "getUserId"
     },
    initialize: function(model)
     {
       this.model = model;   
       this.model.bind("change",this.onModelChange,this);
     },
    onModelChange: function()
    {   
        console.log('onModelChange--lpl-', this.model.changedAttributes());
        this.render();
    },
    render: function(){
        this.name  =  this.model.changedAttributes().name;
        this.el.html(_.template($('#success').html())(this.model.attributes));
        return this;
    },
    getUserId : function()
    {
       this.trigger('submit',this.name);
    }
});

var validateUser = Backbone.View.extend({
    el: $("#block"),
    templates: {
        "error": _.template($('#error').html())
    },
    events : {
        "click #validateUser": "check"   
    },
    initialize: function(model)
    {
      self = this;
      this.model = model;   
//      this.model.bind("change",this.onModelChange,this);
    },
//    onModelChange: function()
//    {   
//        console.log('onModelChange---', this.model.changedAttributes());
////      this.render();
//    },
    render: function(){
        this.el.html(_.template($('#start').html())); 
        return this;
    },
    showError: function()
    {
        console.log("showError");
        this.el.find('.error').html(this.templates.error);
    },
    check: function()
    {    
       var username = this.el.find("input:text").val();  
       this.trigger('submit', username);
    }
});
 var Controller = Backbone.Router.extend({
    views: {},    
    routes: {
        '': 'initDefaultView',
        '!/': 'initDefaultView'
    },
    initialize: function(){
        console.log("Controller initialize");
        ValidateUserModel = new validateUserModel();

        this.views.validateUser = new validateUser(ValidateUserModel);
        this.views.getUserId = new getUserId(ValidateUserModel);

        this.views.validateUser.bind('submit', this.onValidateUser, this);
        this.views.getUserId.bind('submit', this.getUserId, this);

        this.views.validateUser.render();
    },
    initDefaultView: function()
    {
        console.log("This --- default",this);
        this.views.validateUser.render();   
    },  
    onValidateUser:function(name)
    {
        $.ajax({
           type:"get",
           url: "change.php",
           data: {userName:name,action:"validateUser"},
           dataType:"json",
           success:  function(response) {
                if (!response.status || !response.data)
                { 
                    console.log("sdfg----",this);
                    self.showError();
                   return false;
                }
                else{
                  ValidateUserModel.set(response.data);
                    console.log("response  " + JSON.stringify(response.data));
//                  this.views.getUserId.render();
                }
          }
       });  
    },
    getUserId : function(name)
    {
        $.ajax({
           type:"get",
           url: "change.php",
           data: {userName:name,action:"getUserId"},
           dataType:"json",
           success:  function(response){
                   ValidateUserModel.set(response.data);
                    console.log("response  " + JSON.stringify(response.data));
           }       
       });  
    }

});
var controller = new Controller();
});
