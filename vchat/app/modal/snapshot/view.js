import Ember from "ember";
export default Ember.View.extend({
    setupDefault: function(){
        var controller = this.get('controller');
        controller.set('defaultFile', ('screenshot-' + new Date()));
    }.on('init'),
    didInsertElement : function () {
        Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },
    processChildElements: function (){
        var self = this;
        var controller = this.get('controller');
        var img = controller.get('model');
        var fs = require('fs');
        var path = require('path');
        var saver = this.$().find('.save-button').first();
        saver.one('change', function (event) {
            controller.send('openModal', 'modal.waiting', 'Saving...');
            var o = path.parse($(this).val());
            if(o.ext !== '')
            {
                o.base = o.base.slice(0, o.base.length - o.ext.length);
            }
            o.base = o.base + '.png';
            o.ext = '.png';
            fs.writeFile(path.format(o), img, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
                controller.send('closeModal');
            });
        });
        this.$().find('.modal-submit').click(function(e){
            saver.click();
        });
        setTimeout(function(){
            self.$().find('.modal').first().addClass("in");
            self.$().find('.modal-backdrop').first().addClass("in");
            self.$().find('.modal-submit').first().focus();
        }, 10);
    }
});