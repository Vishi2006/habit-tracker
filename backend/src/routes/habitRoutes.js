const express = require('express');
const router = express.Router();
const {createHabit, getHabit, updateHabit, deleteHabit, toggleHabitCheck} = require('../controllers/habitController')

//redirect to habitController when user create, get, update, delete or toggle habit.
router.post('/', createHabit)
router.get('/', getHabit)
router.put('/:id', updateHabit)
router.delete('/:id', deleteHabit)
router.patch('/:id/check', toggleHabitCheck)

module.exports = router;