const fs = require('fs');
const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./lib/shapes');

const promptUser = () => {
    return inquirer.prompt([
        //text prompt
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to 3 characters:',
            validate: value => value.length <= 3
        },
        //text color prompt
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color or hexadecimal number for text:',
        },
        //shape prompt
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape from the following list:',
            choices: ['Traingle', 'Circle', 'Square']
        },
        //shape color prompt
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter color for shape or a hexadecimal number:',
        },
    ]);
};

//function for SVG file
const createSVG = async () => {
    const answers = await promptUser();
    let shape;
    switch (answers.shape) {
        case 'Triangle':
            shape = new Triangle();
            break;
        case 'Circle':
            shape = new Circle();
            break;
        case 'Square':
            shape = new Square();
            break;
    }

    shape.setColor(answers.shapeColor);
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    ${shape.render()}
    <text x="150" y="100" font-size="20" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
</svg>`;
    fs.writeFileSync('logo.svg', svgData);
    console.log('created logo.svg');
};

//call function
createSVG();