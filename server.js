const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const puppeteerOptions = {
    headless: true,
    args: ["--no-sandbox"],
};

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerOptions
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    let myNumber = '6281282131586';
    let bangAgusNumber = '6281282758044';
    let msgStartsWith = 'Assalamualaikum sahabat sahabatku saudara saudaraku';
    let msgEndWith = 'Allah kasih Reski yang banyak dan barokah dan di beri kesehatan';
    let salam = 'وَعَلَيْكُمُ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ';
    let amin = 'آمِيْن يَا رَبَّ العَالَمِيْنَ';
    let defaultReplay = salam +'\n'+amin;
    if (msg.from.includes(myNumber) && msg.body.startsWith(msgStartsWith) && msg.body.endsWith(msgEndWith)) {
        msg.reply(defaultReplay);
    }
    
    
    console.log('From: ', msg.from);
    console.log('Body: ', msg.body);
    
    let chat = await msg.getChat();
    console.log('chat: ', chat);
});

client.initialize();
