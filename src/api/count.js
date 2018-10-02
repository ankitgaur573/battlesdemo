import resource from 'resource-router-middleware';
import BattleModel from '../models/battle';

const countApi = resource({
    index({ params }, res) {

        BattleModel.count({}, function(err, count){
            if(err) res.status(400).send(err);
            else res.json({ battlesCount: count });
        });
    },

});

export default countApi;
