import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                menuBar: '#af742e',
                callBtn: '#558925',
                shareBtn: '#795548',
                detailBtn: '#1b7de5',
            },
        },
    },
});
