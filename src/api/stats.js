import resource from 'resource-router-middleware';
import BattleModel from '../models/battle';

const statsApi = resource({
    index({ params }, res) {

        BattleModel.find().distinct("battle_type", {"battle_type" : { $ne : "" } }, function(err, battleTypes){
            if(err) res.status(400).send(err);
            else {
                BattleModel.aggregate({$group: {_id: {attacker_outcome: '$attacker_outcome'},
                    count: {$sum: 1}}}, function(err, attackerOutcome){
                    if(err) res.status(400).send(err);
                    else{
                        var attackerOutcomeRefined = {};
                        attackerOutcome.forEach(function(individualCount) {
                            // console.log(individualCount);
                            if(individualCount._id.attacker_outcome != ""){
                                console.log(individualCount._id.attacker_outcome);
                                attackerOutcomeRefined[individualCount._id.attacker_outcome] = individualCount.count;
                            }
                        });
                        BattleModel.aggregate({
                            $group: {
                                _id: null,
                                average : { $avg: "$defender_size"},
                                min: {$min: "$defender_size"},
                                max : {$max: "$defender_size"}
                            }
                        }, function(err, defenderSize){
                            if(err) res.status(400).send(err);
                            else {
                                var defenderSizeRefined = {};
                                defenderSizeRefined = defenderSize[0];
                                BattleModel.aggregate([
                                    {
                                        $facet: {
                                            "defender_king" : [
                                                {
                                                    "$group": {
                                                        "_id": "$attacker_king",
                                                        "count": { "$sum": 1 }
                                                    }
                                                },
                                                { "$sort": { "count": -1 } },
                                                { "$limit": 1 }
                                            ],
                                            "attacker_king": [
                                                {
                                                    "$group": {
                                                        "_id": "$attacker_king",
                                                        "count": { "$sum": 1 }
                                                    }
                                                },
                                                { "$sort": { "count": -1 } },
                                                { "$limit": 1 }
                                            ],
                                            "region": [
                                                {
                                                    "$group": {
                                                        "_id": "$region",
                                                        "count": { "$sum": 1 }
                                                    }
                                                },
                                                { "$sort": { "count": -1 } },
                                                { "$limit": 1 }
                                            ],
                                            "name" : [
                                                {
                                                    "$group": {
                                                        "_id": "$name",
                                                        "count": { "$sum": 1 }
                                                    }
                                                },
                                                { "$sort": { "count": -1 } },
                                                { "$limit": 1 }
                                            ]
                                        }
                                    }

                                ], function(err, mostActive){
                                    if(err) res.status(400).send(err);
                                    else {
                                        res.json({ attacker_outcome: attackerOutcomeRefined, battle_type: battleTypes.sort(), defender_size: defenderSizeRefined, most_active: mostActive });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

});

export default statsApi;
