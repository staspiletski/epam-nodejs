const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'please enter a string or help ->'
});

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
        case 'help':
            console.log('help - commands list');
            console.log('exit - exit');
            break;
        case 'exit':
            rl.close();
            break;
        default:
            console.log(`Received: ${line}`);
            console.log(`Converted: ${line.split('').reverse().join('')}`);
            break;
    }
    rl.prompt();
});

rl.on('close', () => {
    console.log('bye bye!');
    process.exit(0);
});
