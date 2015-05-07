$(function () {
var Controller = Backbone.Router.extend({
    routes: {
        "": "start",
        "!/": "start",
        "!/success":"success",
        "!/error":"error"
    },
    start : function(){
      appState.set({state:"start"});
    },
    success : function(){
      appState.set({state:"success"})
          
    },
    error : function(){
       appState.set({state:"error"})
    }   
});
var controller = new Controller();
var AppState = Backbone.Model.extend({
   defaults: {
       username:"",
       state:"start"
   } 
});
var appState = new AppState();
//var Family = ["Саша", "Юля", "Антон"]; 

var Block  = Backbone.View.extend({
    el: $("#block"),
    templates: {
        "start": _.template($('#start').html()),
        "success" :_.template($('#success').html()),
        "error": _.template($('#error').html())
    },
   
    events : {
        "click input:button": "check",
        "click #getUserId" : "getUserId"
    },
    check: function()
    {
       var username = this.el.find("input:text").val();
       
       $.ajax({
           type:"get",
           url: "change.php",
           data: {userName:username,action:"validateUser"},
           dataType:"json",
           success:  function(response){
                appState.set({
                "state": response.status,
                "username": response.name,
                "valid":response.valid
            }); 
            console.log(response);
           }
           
       });  
    },
    getUserId : function()
    {
        $.ajax({
           type:"get",
           url: "change.php",
           data: {userName:username,action:"getUserId"},
           dataType:"json",
           success:  function(response){
                appState.set({
                "state": response.status,
                "username": response.name,
                "valid":response.valid
            }); 
            console.log(response);
           }
           
       });  
    },
    initialize: function(){
        this.model.bind("change",this.render,this);
    },
    render: function(){
        var state = this.model.get("state");
        console.log("this.model" + this.model);
        $(this.el).html(this.templates[state](this.model.toJSON()));
        return this;
    }
});
 var block = new Block({ model: appState });
 appState.trigger("change");
 
 appState.bind("change:state",function(){
        var state = this.get("state");
        console.log("State  ---" + state);
        if(state=="start")
            controller.navigate("!/",false);
        else
            controller.navigate("!/"+state,false)
    });
    Backbone.history.start();
});