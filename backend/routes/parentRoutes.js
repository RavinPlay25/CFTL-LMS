const express = require('express');
const {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent
} = require('../controllers/parentController');

const router = express.Router();

router.post('/', createParent);
router.get('/', getAllParents);
router.get('/:id', getParentById);
router.put('/:id', updateParent);
router.delete('/:id', deleteParent);

module.exports = router;
