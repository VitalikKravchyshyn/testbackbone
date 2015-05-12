$(function () {
    var userModel = Backbone.Model.extend({
        defaults: {
            'username': null,
            'id': null
        }
    });
    var userInfoPage = Backbone.View.extend({
        el: $("#block"),
        events: {
            "click #getUserId": "getUserId"
        },
        initialize: function (model)
        {
            this.model = model;
            this.model.bind("change", this.onModelChange, this);
        },
        template: _.template($('#userPageSuccess').html()),
        onModelChange: function ()
        {
            var attr = this.model.changedAttributes();
            if (attr.username || attr.id)
            {
                this.render();
            }
        },
        render: function () {
            this.el.html(this.template(this.model));
            return this;
        },
        getUserId: function ()
        {
            this.trigger('submit', this.model.attributes.username);
        }
    });

    var validateUserPage = Backbone.View.extend({
        el: $("#block"),
        erorMessage: _.template($('#userPageError').html()),
        template: _.template($('#validateUserPage').html()),
        events: {
            "click #validateUser": "checkUser"
        },
        initialize: function (model)
        {
            this.model = model;
            this.model.bind("change", this.onModelChange, this);
        },
        onModelChange: function () {
            var attr = this.model.changedAttributes();
            if (attr.errorMessage)
            {
                this.showError();
            }
        },
        render: function () {
            this.el.html(this.template(this.model));
            return this;
        },
        showError: function ()
        {
            this.el.find('.error').html(this.erorMessage);
        },
        checkUser: function ()
        {
            var username = this.el.find("input:text").val();
            this.trigger('submit', username);
        }
    });
    var Controller = Backbone.Router.extend({
        initialize: function () {
            console.log("Controller initialize");
            userModel = new userModel();

            this.validateUserPage = new validateUserPage(userModel);
            this.userInfoPage = new userInfoPage(userModel);

            this.validateUserPage.bind('submit', this.onValidateUser, this);
            this.userInfoPage.bind('submit', this.getUserId, this);

            this.validateUserPage.render();
        },
        onValidateUser: function (name)
        {
            $.ajax({
                type: "get",
                url: "change.php",
                data: {userName: name, action: "validateUser"},
                dataType: "json",
                success: function (response) {
                    if (!response.status || !response.data)
                    {
                        var errorMessage = true;
                        userModel.set({errorMessage: errorMessage});
                    }
                    else {
                        userModel.set({username: response.data.name});
                    }
                }
            });
        },
        getUserId: function (name)
        {
            $.ajax({
                type: "get",
                url: "change.php",
                data: {userName: name, action: "getUserId"},
                dataType: "json",
                success: function (response) {
                    userModel.set({id: response.data.id});
                }
            });
        }

    });
    var controller = new Controller();
});
