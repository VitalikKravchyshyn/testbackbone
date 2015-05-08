$(function () {
var validateUserModel = Backbone.Model.extend({}); 
var getUserId  = Backbone.View.extend({});

var validateUser  = Backbone.View.extend({
    el: $("#block"),
    templates: {
        "error": _.template($('#error').html())
    },
    events : {
        "click #validateUser": "check",
        "click #getUserId" : "getUserId"
    },
    initialize: function()
    {
     // this.model = model;      
      this.model.bind("change",this.onModelChange,this);
    },
    onModelChange: function()
    {   
        console.log('onModelChange', this.model.changedAttributes());
        this.render();
    },
    render: function(){
        $(this.el).html(_.template($('#start').html(this.templates.error))); 
        return this;
    },
    showError: function()
    {
        $(this.el).find('.error').html();
    },
    check: function()
    {
       var username = this.el.find("input:text").val();
       
       this.trigger('submit', username);    

    },
    getUserId : function()
    {
        $.ajax({
           type:"get",
           url: "change.php",
           data: {userName:this.model.get("username"),action:"getUserId"},
           dataType:"json",
           success:  function(response){
               if (!response.status || !response.data)
                {
                    //This mean an error occured
                    // TODO: show error message
                    $("#errormessage").html(view.templates['error']); 
                    return false;
                }
                else{
                  pmodel.set(response.data);  
                }    
           }
          
       });  
    }
});
 var Controller = Backbone.Router.extend({
    views: {},    
    routes: {
        '/': 'initDefaultView'
    },
    initialize: function(){
      // var validateUserModel = new validateUserModel();
        this.views.validateUser = new validateUser(validateUserModel);  
        this.views.validateUser.on('submit', this.onValidateUser, this);
    },
    initDefaultView: function()
    {
//        this.navigate('/validateUser', {})
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
//                    this.views.validateUser.showError();
//                 $(".error").html(view.templates['error']); 
                    return false;
                }
                else{
                  validateUserModel.set(response.data);  
                }
          }
       });  
    }
    
});
var controller = new Controller();
});
