'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  const welcomeList = new Map([
    ['hej', `hej, hej, hej gdzie jest Kate`],
    ['cześć', `no cześć, lubisz jeść?`],
    ['siemka', `siemka, siemka widziałeś Benka?`]
  ]);

  function list(agent) {
    const welcome = agent.parameters[`welcome`];

    let standardWelcome = welcome.toLowerCase();
    let answer = '';
    for (let [key, value] of welcomeList) {

      if (key !== standardWelcome) {
        answer =`${standardWelcome}, trala lala. Nie znalezłem rymowanki dla tego słowa.`;
      } else {
        answer = value;
        break;
      }
    }
    agent.add(answer);
  }
  let intentMap = new Map();
  intentMap.set('list',list);
  agent.handleRequest(intentMap);
});