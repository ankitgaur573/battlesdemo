import resource from 'resource-router-middleware';
import resMessage from '../lib/res-message';
import UserModel from '../models/user';
import BattleModel from '../models/battle';

const csvFilePath='battles.csv';
// const csv=require('csvtojson');
import csv from 'csvtojson';


const loadApi = resource({
    index({ params }, res) {

        csv()
            .fromFile(csvFilePath)
            .then((jsonObj)=>{
                console.log(jsonObj.length);
                for(var i = 0; i<jsonObj.length; i++){
                    jsonObj[i]["location"] = jsonObj[i]["location"].split(',');
                    let battle = new BattleModel(jsonObj[i]);
                    battle.save()
                        .then(console.log("saved"))
                        .catch(error => console.log(error.message))
                }
            });


        UserModel.find()
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error))
    },

});

export default loadApi;
