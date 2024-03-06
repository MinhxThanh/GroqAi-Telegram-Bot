const Groq = require("groq-sdk");
const TelegramBot = require('node-telegram-bot-api');

// Replace with your Telegram bot token and Groq API key
const TELEGRAM_TOKEN = 'YOUR_TELEGRAM_TOKEN';
const GROQ_API_KEY = 'YOUR_GROP_API_KEY';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const groq = new Groq({ apiKey: GROQ_API_KEY });

console.log("Bot running..")
console.log("------------------------------------")

async function handleRequest(msg) {
  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: msg.text }],
    model: "mixtral-8x7b-32768"
  }).then((chatCompletion) => {
    return chatCompletion.choices[0]?.message?.content || "I'm still learning how to answer that!";
  });

  console.log("------------------------------------")

  console.log(" # User: " + msg.text)
  console.log(" # AI: " + completion)

  console.log("------------------------------------")

  bot.sendMessage(msg.chat.id, completion); 
}

bot.on('message', handleRequest);
