const { spawn }  = require('child_process')

module.exports = (time = 5000)=>{
    const seconds = parseInt(time / 1000)
    console.log(`Restarting server in ${seconds}`)
    console.log("This is pid " + process.pid);
    setTimeout(() => {
        process.on("exit", function () {
            spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached : true,
                stdio: "inherit"
            });
        });
        process.exit();
    }, time);
}