const exec = require('child_process').exec
const mkdirp = require('mkdirp-promise')
const path = require('path')
const process = require('process')
const fs = require('fs')
const index = require('./index')
const readline = require('readline-sync')
const shell = require('shelljs').exec;


const direct='C:/Users/jarde/Automated/'
let projectName = undefined
var project_dir = undefined
// let contentReadme = "Será que dará certo?"

projectName = readline.question(`What's project name?  `);       
project_dir = path.join(direct, projectName)
createDirectory(project_dir) 
getAdress();

async function getAdress(){
    await waitAuto()
    adress=index.adress
    if(adress != null){
        commands()
    }else{  
        throw new Error("Already exists a project with this name :(");
    }    
}

async function waitAuto(){
    const auto = await index.auto
    return
}

 function createDirectory(project_dir) {
    fs.mkdir(project_dir, function(err) {
        if (err) {
          console.log(err)
        } else {
        changeDirectory(project_dir)
        //console.log("New directory successfully created.")
        }
    }) 
}

function changeDirectory(project_dir){
    try { 
        process.chdir(project_dir); 
       // console.log("directory has successfully been changed"); 
        createReadme()
      } catch (err) { 
        console.error("error while changing directory"); 
      } 
}

async function createReadme(){
    exec('echo The new Project has started! > readme.md', (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`)
          return
        }        
    })
}

function commands(){
    console.log(process.cwd())
    shell('git init')

    var comand = 'git remote add origin '+ adress
    shell('git init')
    shell('git add .')   
    shell('git commit -m "First deploy"')
    shell(comand)
    console.log(comand + " comand")
    shell('git push -u origin master')
    shell('npm init -y')
    shell('code .')
}

module.exports.name = projectName