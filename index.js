#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import clear from 'console-clear';
import { exec } from 'child_process';
import downloadGitRepo from 'download-git-repo'; // Add this line to import the package

import nanospinner from "nanospinner";

/////////////////////////////////////////////donwload

async function downloadRepo(nom,url) {
    const repoUrl = url; // URL of the GitHub repository

    const spinner = nanospinner.createSpinner('loading').start();

    // Specify the path where you want to save the downloaded repository
    const downloadPath = `./${nom}`;

    // Use child_process.exec() to run the git clone command
    exec(`git clone ${repoUrl} ${downloadPath}`, (error, stdout, stderr) => {
        spinner.stop();
        if (error) {
            console.error(chalk.red('Error', error.message));
        } else {
            console.log(chalk.green('Created successfully!'));
            const spinner = nanospinner.createSpinner('Update all libraries').start();
            exec(`cd ${nom} && npm install`, (error, stdout, stderr) => {
                if (error) {
                    spinner.stop();
                    console.error(chalk.red('Error', error.message));
                } else {
                            spinner.stop();
                            console.log(chalk.green('Updated successfully!'));
                        }

            });
        }
    });
}


async function select(){
    const answer=await inquirer.prompt({
        name:"typeofdb",
        type:'list',
        message:'type of db',
        choices:[
            "ODM (moongose)",
            "ORM (prisma)"

        ]
    })
    return answer.typeofdb
}
async function getname(){
    const answer=await inquirer.prompt({
        name:"name",
        type:'input',
        message:chalk.underline('project name:'),
        default(){
            return "project";
        }
    })
    return answer.name
}
function bar(){
    var x2=""
    for (var i=0;i<50;i++){
        x2+="="
    }
    console.log(chalk.green(x2));}
function space(){
    var x=""
    for (var i=0;i<20;i++){
        x+=" "
    }
    return x;
}


function titlebar(){
    bar()
    console.log(space()+chalk.cyan.underline.bold('bo7')+chalk.underline.yellow('Express'))
    bar();
}
titlebar();
var name=await getname();
console.log(name)
var r=await select();
clear()
titlebar()
if(r=="ODM (moongose)"){
    downloadRepo(name,'https://github.com/17med/default_express1.git')
}
else{
    console.log("coming soon");
}




