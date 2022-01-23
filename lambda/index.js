/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
var http = require('http'); 
var https = require('https');

var key = 'f2085361-27b5-4953-8617-83b14473343f';
var telephoneThatWillSend = '5581971096881';
var apiUrlWaSend = 'compesa.ddns.net';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
        async handle(handlerInput) {
        
        /*
        let humidity = response.humidity
        let temperature = response.temperature
        
        let speakOutput = 'A última temperatura registrada foi ' + temperature + ' graus, e a umidade da sala estava em ' + humidity + 'porcento';
        //let speakOutput = 'Problema é teu, vai ter que passar o final de semana estudando e trabalhando mesmo..';
        
        */
        let d = new Date();
        let hour = d.getHours();
        let cortesia = '';
        if(hour < 5){
           cortesia = "Boa Noite";
        } else if(hour < 12) {
            cortesia  =" Bom Dia!";
        } else if(hour < 18)        {
            cortesia = "Boa tarde";
        } else {
           cortesia = "Boa noite";
        }
         
        let speakOutput = "Olá Edson, " + cortesia + ". O que você deseja?";
        
        
       // const response = await sendMessageToWhatsApp("81982001303", "Teste");
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("Não entendi, tente dizer, por exemplo, último status.")
            .getResponse();
            
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    async handle(handlerInput) {
        
         //const response = await httpPost(apiUrlDatacenterInfo, '/api/datacenterinfo/last');
        let speakOutput = 'oi';
        
       
        let response = await datacenterInfo("aws/cost");
        if(response.code === 'success'){
            speakOutput = response.message;
            if( null !== response.reprompt && undefined !== response.reprompt && "" !== response.reprompt && 'undefined' !== response.reprompt.toLowerCase()){
                return handlerInput.responseBuilder
                    .speak(speakOutput + ". " + response.reprompt)
                    .reprompt(response.reprompt)
                    .getResponse();
            }
        }else{
            speakOutput = "Algum erro ocorreu na consulta da API.";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const LastStatusIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LastStatusIntent';
    },
    async handle(handlerInput) {
        
         //const response = await httpPost(apiUrlDatacenterInfo, '/api/datacenterinfo/last');
        let speakOutput = 'oi';
        
       
        let response = await datacenterInfo("last");
        if(response.code === 'success'){
            speakOutput = response.message;
            if( null !== response.reprompt && undefined !== response.reprompt && "" !== response.reprompt && 'undefined' !== response.reprompt.toLowerCase()){
                return handlerInput.responseBuilder
                    .speak(speakOutput + ". " + response.reprompt)
                    .reprompt(response.reprompt)
                    .getResponse();
            }
        }else{
            speakOutput = "Algum erro ocorreu na consulta da API.";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
 
 function datacenterInfo(command){
    command = encodeURI(command)
    let response = httpPost(apiUrlWaSend, "/api/datacenterinfo/" + command);
    return response;
 }
 
 
 function sendMessageToWhatsApp(telephone, message){
    message = encodeURI(message)
    let response = httpPost(apiUrlWaSend, "/api/f2085361-27b5-4953-8617-83b14473343f/5581982001303/send?to=" + telephone + "&message=" + message);
    return response;
 }
        
        
function httpPost(url, route) {
      return new Promise(((resolve, reject) => {
        var options = {
            host: url,
            port: 80,
            path: route,
            method: 'POST',
        };
        
        const request = http.request(options, (response) => {
            response.setEncoding('utf8');
            let returnData = '';
        
            response.on('data', (chunk) => {
                returnData += chunk;
            });
        
            response.on('end', () => {
                resolve(JSON.parse(returnData));
            });
        
            response.on('error', (error) => {
                reject(error);
            });
        });
        request.end();
      }));
}

 
const OpenTicketIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OpenTicketIntent';
    },
    async handle(handlerInput) {
        let speakOutput = 'oi';
        
        let response = await datacenterInfo("last/openticket");
        if(response.code === 'success'){
            speakOutput = response.message;
        }else{
            speakOutput = "Algum erro ocorreu na consulta da API.";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
}


  
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'beleza!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você acabou de desencadear ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Desculpe, Tive problemas para fazer o que você pediu. Por favor, tente novamente. O erro foi: '+JSON.stringify(error);
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
 

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        LastStatusIntentHandler,
        OpenTicketIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
        )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
    

