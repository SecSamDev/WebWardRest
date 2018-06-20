const {checkIfArachniIsDeployed} = require('../kube/deploy-arachni')



async function checkArachni() {
    try {
        await checkIfArachniIsDeployed(false);
    } catch (err) {}
}

/**
 * Periodically checks where is stored Arachni and if its available
 */
exports.arachniWatchdog = () => {
    //First check arachni
    checkArachni()
    //Then arachni every minute
    setInterval(checkArachni, 60000);
}