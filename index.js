const puppeteer = require('puppeteer')
const data= require('./datas.json')
const server= require('./server')
const path = require('path')

const request = require('request-promise')
const cheerio = require('cheerio');

let adressJson = undefined;

async function auto(){
    const browser = await puppeteer.launch({ // to use chrome instead of chromium cause puppeteer
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        args: [
            '--auto-open-devtools-for-tabs',
            '--disable-dev-shm-usage'
        ]
    });
    
    const page = await browser.newPage()
    await page.goto('https://github.com/login', {waitUntil: 'load'})
    //await page.screenshot({path: 'example.png'});
    await page.type('#login_field', data.user, {delay: 6})
    await page.type('#password', data.password, {delay: 6})
    await page.keyboard.press('Enter')

    await page.waitForNavigation()
    await page.goto('https://github.com/new', { waitUntil: 'load'})
    await page.type('#repository_name', server.name)
    await page.type('#repository_description', 'Starting a new project')
    await page.keyboard.press('Enter')

    await page.waitForNavigation()    
    const [xa] = await page.$x('/html/body/div[4]/div/main/div[3]/div/git-clone-help-controller/div[1]/div/div[3]/div/span/input')
    const adress = await xa.getProperty('value')
    adressJson = await adress.jsonValue()

    if(adressJson !== null){
        //console.log(adressJson + ' index')
        module.exports.adress = adressJson
    }else{
        adressJson = null
        //console.log(adressJson+ 'not YEAA')
        module.exports.adress = null
    }

    browser.close()
}
module.exports.auto = auto()

