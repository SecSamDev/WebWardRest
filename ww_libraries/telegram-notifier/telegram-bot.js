const request = require('request');
/**
 * Simple telegram Bot. It only allow us to send messages to a certain chat
 */
class TelegramBot {
    constructor(token, chat) {
        this.url = `https://api.telegram.org/bot${token}`;
        this.chat = chat;
        this.chatID = null;
        this.lastUpdate = null;
        this.lastSendMessage = Date.now() - 5000;
    }
    async getMe() {
        return new Promise((resolve, reject) => {
            try {
                request.get(this.url + '/getMe', (error, r, body) => {
                    if (error) reject(error)
                    const response = JSON.parse(body).result
                    console.log(body)
                    if (!response) return

                    this.id = response.id || ''
                    this.first_name = response.first_name || ''
                    this.last_name = response.last_name || ''
                    this.username = response.username || ''
                    this.language_code = response.language_code || ''
                    resolve()
                })
            } catch (err) {
                reject(err)
            }

        })
    }
    async sendMessage(msg, parseMode = null) {
        if((Date.now() - this.lastSendMessage) > 3000){
            return new Promise((resolve, reject) => {
                this.lastSendMessage = Date.now();
                try {
                    request.post(this.url + '/sendMessage',
                    {
                        json : true,
                        body : {
                            chat_id : this.chatID,
                            text : msg,
                            parse_mode : parseMode ? parseMode : ""
                        }
                    }, (error, r, body) => {
                        if (error) reject(error)
                        const response = typeof body === 'string' ? JSON.parse(body) : body;
                        if (!response) return
                        if(response.ok)
                            resolve(response.result)
                        else
                            reject(response)
                    })
                } catch (err) {
                    reject(err)
                }
            })
        }else{
            console.log("lastSendMessage " + this.lastSendMessage + " now:"+Date.now())
            return null;
        }
        
    }
    async getUpdates() {
        return new Promise((resolve, reject) => {
            try {
                request.get(this.url + '/getUpdates',
                {
                    json : true,
                    body : {
                        offset : this.lastUpdate
                    }
                }, (error, r, body) => {
                    if (error) reject(error)
                    const response = typeof body === 'string' ? JSON.parse(body) : body;
                    if (!response) return
                    if(response.ok)
                        resolve(response.result)
                    else
                        reject(response)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
    async getChatId() {
        return new Promise((resolve, reject) => {
            try {
                request.get(this.url + '/getUpdates',
                {
                    json : true
                }, (error, r, body) => {
                    if (error) reject(error)
                    const response = typeof body === 'string' ? JSON.parse(body) : body;
                    if (!response) return
                    if(response.ok){
                        let respMsgs = response.result;
                        if(respMsgs && respMsgs.length > 0){
                            for (const chatMsg of respMsgs) {
                                if(chatMsg.message && chatMsg.message.chat){
                                    if(chatMsg.message.chat.title == this.chat){
                                        this.chatID = chatMsg.message.chat.id;
                                        this.lastUpdate = chatMsg.update_id;
                                        break;
                                    }
                                }
                            }
                            if(this.chatID){
                                this.getUpdates().then(()=>{
                                    resolve(this.chatID)
                                }).catch(err=>{
                                    reject(err)
                                })
                                
                            }
                        }else{
                            reject("TelegramBotError: No messages")
                        }
                    }
                    else
                        reject(response)
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}
exports.TelegramBot  = TelegramBot;