import resource from 'resource-router-middleware';
import BattleModel from '../models/battle';

const listApi = resource({
    index({ params }, res) {

        BattleModel.find().distinct("location", {"location" : { $ne : "" } }, function(err, places){
            if(err) res.status(400).send(err);
            else res.json({ places: places.sort() });
        });
    },

});

export default listApi;
