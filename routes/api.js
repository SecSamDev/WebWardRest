const { execSync, exec } = require('child_process');

const Router = require('express-promise-router')
const authController = require('../controllers/auth')
const webProjController = require('../controllers/webproject');
const userController = require('../controllers/user');
const scanProfile = require('../controllers/scan-profile')
const pipelineController = require('../controllers/pipeline');
const pipeNodeController = require('../controllers/pipe-node');
const nodeStoredController = require('../controllers/node-stored');
const infrastructureController = require('../controllers/infrastructure');
const kubernetesController = require('../controllers/kubernetes');
const kubeObjectController = require('../controllers/kube-objects');
const wwmoduleController = require('../controllers/ww-modules')
const arachniController = require('../controllers/arachni')
const reportController = require('../controllers/report')
const thModelController = require('../controllers/threat-model')

const db = require('../db/index')
const shell = require('../utils/shell')
const webhooks = require('../controllers/webhook')
const router = new Router();

function ensureAuthenticated(req, res, next) {
    if (req.user && typeof req.user === 'string')
        return next();
    else
        res.status(401).jsonp({ 'error': 'Unauthorized' })
}
/* GET version */
router.get('/', async (req, res, next) => {
    res.status(200).send({ 'v': 1 });
});

const reqBeenUser = authController.needAuth(0);
const reqBeenResp = authController.needAuth(1);
const reqBeenPriv = authController.needAuth(2);
const reqBeenAdmin = authController.needAuth(3);


//--------------------------------------AUTH------------------------------------
router.route('/authenticate')
    .get(authController.isAuthenticated)
    .post(authController.authenticateUser);
//--------------------------------------WebProjects------------------------------------
router.route('/webproject/:name')
    .get(reqBeenUser, webProjController.findWebProject)
    .put(reqBeenPriv, webProjController.updateWebProject)
    .delete(reqBeenPriv, webProjController.deleteWebProject)
router.route('/webproject')
    .get(reqBeenUser, webProjController.findWebProjects)
    .post(reqBeenPriv, webProjController.createWebProject);

//--------------------------------------User Management------------------------------------
router.route('/user/:name')
    .delete(reqBeenResp, userController.deleteUser)
    .get(reqBeenUser, userController.findUser)
    .put(reqBeenResp, userController.updateUser)

router.route('/user')
    .get(reqBeenUser, userController.findUsers)
    .post(reqBeenResp, userController.createUser);

//--------------------------------------SCAN PROFILE------------------------------------
router.route('/scan_profile/:name')
    .delete(reqBeenPriv,scanProfile.deleteScanTemplate)
    .get(reqBeenPriv, scanProfile.findScanTemplate)
    .put(reqBeenPriv, scanProfile.updateScanTemplate)
router.route('/scan_profile')
    .get(reqBeenPriv, scanProfile.findScanTemplate)
    .post(reqBeenPriv, scanProfile.createScanTemplate)

//--------------------------------------REPORTS------------------------------------
router.route('/report/:proj/:name')
    .delete(reqBeenPriv,reportController.deleteReport)
    .get(reqBeenPriv, reportController.findReport)
router.route('/report/:proj')
    .get(reqBeenPriv, reportController.findReports)
//--------------------------------------ARACHNI------------------------------------

/**
 * TODO: improve system and let get all reports
*/
router.route('/arachni/rest')
    .get(reqBeenAdmin, arachniController.getReportsREST)
router.route('/arachni/rest/:name')
    .get(reqBeenAdmin, arachniController.getReportREST)
    .delete(reqBeenAdmin,arachniController.deleteReportREST)

//--------------------------------------Infraestructure------------------------------------

/**
 * TODO: improve system and let custom infrastructure objects
 * The infraestructure allow us to create simple and powerful 
 * Infraestructure Objects that can be converted in kubernetes or docker objects
*/
router.route('/infrastructure/:name/:active?')
    .delete(reqBeenAdmin, infrastructureController.deleteInfrastructure)
    .get(reqBeenAdmin, infrastructureController.findInfrastructure)
    .put(reqBeenAdmin, infrastructureController.updateInfrastructure)
router.route('/infrastructure')
    .get(reqBeenAdmin, infrastructureController.findInfrastructures)
    .post(reqBeenAdmin, infrastructureController.createInfrastructure);

//--------------------------------------Kubernetes API------------------------------------
/**
 * TODO: Allow accessing directly to kubernetes objects and API
 * The kubernetes allow us to access the kubernetes API
*/
/*
router.route('/kubernetes/:name')
    .delete(reqBeenAdmin, kubernetesController.deleteKubeObject)
    .get(reqBeenAdmin, kubernetesController.findKubeObject)
    .put(reqBeenAdmin, kubernetesController.updateKubeObject)
router.route('/kubernetes')
    .get(reqBeenAdmin, kubernetesController.findKubeObject)
    .post(reqBeenAdmin, kubernetesController.createKubeObject);
*/
//--------------------------------------KubernetesObjects------------------------------------
/**
 * KubeObject allow us to store Kubernete files in the DB
*/
/*
router.route('/kube-object/:name')
    .delete(reqBeenAdmin, kubeObjectController.deleteKubeObject)
    .get(reqBeenAdmin, kubeObjectController.findKubeObject)
    .put(reqBeenAdmin, kubeObjectController.updateKubeObject)
router.route('/kube-object')
    .get(reqBeenAdmin, kubeObjectController.findKubeObjects)
    .post(reqBeenAdmin, kubeObjectController.createKubeObject);
*/
//--------------------------------------WWModules------------------------------------
//Load modules 
router.route('/ww-module/:name')
    .delete(reqBeenAdmin, wwmoduleController.deleteWWModule)
    .get(reqBeenAdmin, wwmoduleController.findWWModule)
    .post(reqBeenAdmin,wwmoduleController.validModuleInURL)
router.route('/ww-module')
    .get(reqBeenAdmin, wwmoduleController.findWWModules)
    .post(reqBeenAdmin, wwmoduleController.registerWWModule);

//----------------------------------PIPELINE------------------------------------
router.route('/pipeline')
    .get(reqBeenPriv,pipelineController.findPipelines)
    .post(reqBeenPriv,pipelineController.createPipeline)
router.route('/pipeline/nodes')
    .get(reqBeenPriv,pipeNodeController.findAllNodes)
router.route('/pipeline/:name')
    .get(reqBeenPriv,pipelineController.findPipeline)
    .delete(reqBeenPriv,pipelineController.deletePipeline)
    .put(reqBeenPriv,pipelineController.updatePipeline)

//---------------------------------- Threat Model ------------------------------------

router.route('/threat-model/:proj')
    .get(reqBeenPriv,thModelController.findThreatModels)
    .post(reqBeenPriv,thModelController.createThreatModel)
    router.route('/threat-model/:proj/:id')
    .get(reqBeenPriv,thModelController.findThreatModel)
    .delete(reqBeenPriv,thModelController.deleteThreatModel)
    .put(reqBeenPriv,thModelController.updateThreatModel)
//----------------------------------Node-Store------------------------------------
/**
 * For storing personalized templates
 */
router.route('/nodes')
    .get(reqBeenPriv,nodeStoredController.findNodes)
    .post(reqBeenPriv,nodeStoredController.createNode)
router.route('/nodes/:name')
    .get(reqBeenPriv,nodeStoredController.findNode)
    .delete(reqBeenPriv,nodeStoredController.deleteNode)
    .put(reqBeenPriv,nodeStoredController.updateNode)
//---------------------------------PIPE_NODE-----------------------------------
router.route('/node_templates').get(reqBeenPriv,pipeNodeController.getTemplates);

router.route('/pipeline/:name/node')
    .get(reqBeenPriv,pipeNodeController.findNodes)
    .post(reqBeenPriv,pipeNodeController.createNode)
router.route('/pipeline/:pipename/node/:name')
    .get(reqBeenPriv,pipeNodeController.findNode)
    .delete(reqBeenPriv,pipeNodeController.deleteNode)
    .put(reqBeenPriv,pipeNodeController.updateNode)

//------------------------------------ WEBHOOKS----------------------------------
router.route('/webhook')
    .post(reqBeenPriv,webhooks.createWebHook)
    .get(reqBeenPriv,webhooks.findWebHooks)
router.route('/webhook/node/:name')
    .get(reqBeenPriv,webhooks.findWebHookForNode)
router.route('/webhook/:name')
    .get(webhooks.activateGET)
    .delete(reqBeenPriv,webhooks.deleteWebHook)
    .put(reqBeenPriv,webhooks.updateHook)

//--------------------------------------Console------------------------------------
router.route('/console').post(reqBeenAdmin, async (req, res, next) => {
    try {
        let subproc = await shell.shell();
        subproc.stdin.setEncoding('utf8');
        subproc.stdout.setEncoding('utf8');
        res.status(200);
        subproc.stdin.on('finish', () => { })
        subproc.stdout.pipe(res)
        subproc.stdout.on('close', () => {
            res.end();
        })
        subproc.stderr.on('data', (data) => { })
        subproc.stdin.write(req.body.command + "\n");
        subproc.stdin.write("exit\n");
        subproc.stdin.end();
    }catch(err){
        res.status(500).jsonp({'message' : 'Error launching shell'})
    }
    
    
});

router.route('/database').post(reqBeenAdmin, async (req, res, next) => {
    try {
        if(typeof req.body.command === 'string'){
            let resDB = await db.query(req.body.command)
            res.status(200).jsonp(resDB);
        }
    }catch(err){
        res.status(500).jsonp({'message' : 'Error sending command to DD.BB.'})
    }
});

//-------------------------------Kubernetes--------------------------
router.route('/isVirtualized').get(async (req, res, next) => {
    res.status(200).jsonp({
        'docker': 'docker' in process ? process.docker : false,
        'kubernetes': 'kubernetes' in process ? process.kubernetes : false,
    });
})


module.exports = router;
