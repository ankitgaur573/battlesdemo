import resource from 'resource-router-middleware';
import BattleModel from '../models/battle';
import resMessage from "../lib/res-message";

const searchApi = resource({

    id: 'searchTerm',

    index({ params }, res) {
        res.status(400).send("Please give a search term.")
    },

    read({ params: { searchTerm } }, res) {
        let regx = new RegExp(searchTerm, "i");
        let query = {
            "$or" :[
                {"name" : regx},
                {"attacker_king" : regx},
                {"defender_king" : regx},
                {"attacker_1" : regx},
                {"attacker_2" : regx},
                {"attacker_3" : regx},
                {"attacker_4" : regx},
                {"defender_1" : regx},
                {"defender_2" : regx},
                {"defender_3" : regx},
                {"defender_4" : regx},
                {"battle_type" : regx},
                {"attacker_commander" : regx},
                {"defender_commander" : regx},
                {"location" : regx},
                {"region" : regx},

                ]

        };
        BattleModel.find(query)
            .then(result => res.send(result))
            .catch(() => res.status(404).send(resMessage('Userssss not found.')))
    },
});

export default searchApi;
