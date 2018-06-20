const Router = require('express-promise-router')
const router = new Router();
const db = require('../db/index')
const fs = require('fs');
const path = require('path')
/* GET home page. */
router.get('/', async (req, res, next) => {
  res.sendFile('/index.html');
});
router.get('/healthz', async (req, res, next) => {
  try {
    await db.query('SELECT NOW()');
    res.status(200).send('ok')
  } catch (err) {
    res.status(500).send('Cant access the DB')
  }
})
//TODO: IMPROVE SYSTEM
router.get('/files/:name', async (req, res, next) => {
  if (req.user && req.user.id && req.user.role) {
    let filePath = path.join(__dirname, '../uploads/' + req.params.name);
    if (req.user.role < 3) {
      let threatModelID = req.params.name.split("__");
      if (threatModelID.length !== 2) {
        res.end(404)
      } else {
        db.query(`SELECT * FROM threat_model WHERE id=$1`, [threatModelID[0]]).then((data) => {
          console.log("HEHE")
          console.log(data)
          if (data.rowCount > 0) {
            fs.exists(filePath, (exists) => {
              if (exists) {
                res.sendFile(filePath);
              } else {
                res.end(404)
              }
            })
          } else {
            console.log("WEWE")
            res.end(404)
          }
        }).catch(err => {
          console.log(err)
          res.end(404);
        })

      }

    } else {
      fs.exists(filePath, (exists) => {
        if (exists) {
          res.type(extractContentType(filePath.split('.').pop()));
          res.sendFile(filePath);
        } else {
          res.end(404)
        }
      })
    }
  } else {
    res.status(401).send({ 'error': "Unauthorized" })
  }
})

/**
 * Report violation of CSP
 */
router.post('/report-violation', function (req, res) {
  if (req.body) {
    console.log('CSP Violation: ', req.body)
  } else {
    console.log('CSP Violation: No data received!')
  }
  res.status(204).end()
})
router.post('/report-ct', function (req, res) {
  if (req.body) {
    console.log('CT Violation: ', req.body)
  } else {
    console.log('CT Violation: No data received!')
  }
  res.status(204).end()
})
module.exports = router;

function extractContentType(fileExt) {
  switch (fileExt) {
    case 'htm': 
      return 'text/html';
    case 'html': 
      return 'text/html';
    case 'doc': 
      return 'application/msword';
    case 'pdf': 
      return 'application/pdf';
    default: 
      return 'application/octet-stream';
  }
}