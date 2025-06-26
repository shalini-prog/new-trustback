const express = require('express');
const router = express.Router();
const controller = require('../controllers/vrole.js');

router.get('/', controller.getAllRoles);
router.post('/', controller.createRole);
router.put('/:id', controller.updateRole);
router.delete('/:id', controller.deleteRole);
router.patch('/:id/toggle', controller.toggleStatus);

module.exports = router;
