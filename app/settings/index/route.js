import Ember from 'ember';
const { Route, RSVP, run, inject } = Ember;

export default Route.extend({
    settings: inject.service(),
    model: function(){
        //copy the array, and make it async so rendering can happen without freezing on the cog button
        return new RSVP.Promise((res) => {
            run.later('afterRender', () => {
                res(this.get('settings').getIceServers().concat([]));
            });
        });
    },
    actions: {
        setServers: function(arr){
            this.get('settings').setIceServers(arr);
        },
        resetServers: function(){
            this.get('settings').resetIceServers();
            this.refresh();
        }
    }
});
