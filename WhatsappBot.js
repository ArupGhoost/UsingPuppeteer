const puppeteer = require('puppeteer');

const main = async ()=>{
    try{
        //Puppeteer launch
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );

        //Navigates to whatsapp
        await page.goto('https://web.whatsapp.com/');
        await page.waitForSelector('._1Mxsz');
        await delay(5000);

       //change to contact you want to send messages
        const contactName = 'Chinki jio';
        await page.click(`span[title='${contactName}']`);
        await page.waitForSelector('._3uMse');

        //find the message bar and focuses on it
        const editor = await page.$("div[data-tab='1']");
        await page.focus();

        //amount messages you want to send
        const amountofMessages = 100;

        //Loops of cycle of sending messages
        for(var i = 0; i < amountofMessages; i++){
            await page.evaluate(() =>{
                const message = 'Well Done';
                document.execCommand("insertText", false, message);
            });
            await page.click('span[data-testid="send"]');
            await delay(500);
        }

    } catch(e){
        console.log(e);
    }
};
main();