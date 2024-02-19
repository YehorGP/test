lpTag.agentSDK.init()

function sayHi(message) {
    console.log(`Hi, ${message}`)
}

function onGetSuccess(message, data) {
    console.log(`Get was succesful for ${message}, here is a data:`)
    console.log(data)
}

function onGetError(message, err) {
    console.log(`Get was not succesful for ${message}, here is an error:`)
    console.log(err)
}


function lpGet(pathToData) {
    lpTag.agentSDK.get(pathToData, (data) => onGetSuccess(pathToData, data), (error) => onGetError(pathToData, onGetError))
}

const COMMANDS = {
    write: lpTag.agentSDK.cmdNames.write,
    writeSC: lpTag.agentSDK.cmdNames.writeSC,
    notify: lpTag.agentSDK.cmdNames.notify,
    sendFile: lpTag.agentSDK.cmdNames.sendFile
}

function notifyWhenDone(message, err) {
    if (err) {
        console.log(`Command failed for ${message}, with next error:`)
        console.log(err)
        return
    }

    console.log(`Command was succesful for ${message}`)
}

function lpCommand(cmdName, data) {
    lpTag.agentSDK.command(cmdName, data, (err) => notifyWhenDone(cmdName, err));
}

lpTag.agentSDK.onVisitorFocused(() => console.log('User set focus to the chat'));
lpTag.agentSDK.onVisitorBlurred(() => console.log('User lost focus from the chat'));