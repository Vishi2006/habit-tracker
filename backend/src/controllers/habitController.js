const habitModel = require('../models/habitModel');

//create habit with user refrence
const createHabit = async (req, res) => {
    
    try {
        const {title, frequency} = req.body;
        if (!title){
            return res.status(400).json({message : "habit name is required"});
        }

        const newHabit = await habitModel.create({
            title,
            frequency: frequency || "daily",
            user: req.user.id
        });

        res.status(201).json({
            message: "habit created successfully",
            data: newHabit
        });
 
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }

}

//get all habits of logged-in user
const getHabit = async (req, res) => {
    try {
       const habits = await habitModel.find({user: req.user.id});
       
       // Add completedToday and fix streak for each habit
       const habitsWithToday = await Promise.all(habits.map(async (habit) => {
         const today = new Date().setHours(0, 0, 0, 0);
         const completedToday = habit.completedDates.some(date =>
           new Date(date).setHours(0, 0, 0, 0) === today
         );
         const correctStreak = calculateStreak(habit.completedDates);
         if (habit.streak !== correctStreak) {
           habit.streak = correctStreak;
           await habit.save();
         }
         return Object.assign(habit.toObject(), { completedToday });
       }));

       res.status(200).json({
        message: "habits fetched successfully",
        data: habitsWithToday
       });
        
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}

//update habits
const updateHabit = async (req, res) => {

    try {
    const habitId = req.params.id;
    const habit = await habitModel.findOneAndUpdate(
      { _id: habitId, user: req.user.id }, // user restriction
      req.body,
      { new: true } // return updated habit
    );

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({
      message: "Habit updated successfully",
      data: habit
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//delete habits
const deleteHabit = async (req, res) => {

    try {
    const habitId = req.params.id;

    const habit = await habitModel.findOneAndDelete({
      _id: habitId,
      user: req.user.id
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({
      message: "Habit deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

//Toggle mark habit completed for today
const toggleHabitCheck = async (req, res) => {
    try {
    const habitId = req.params.id;
    const habit = await habitModel.findOne({ _id: habitId, user: req.user.id });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : [];
    habit.completedDates = completedDates;
    const today = new Date().setHours(0, 0, 0, 0);
    const index = habit.completedDates.findIndex(date =>
      new Date(date).setHours(0, 0, 0, 0) === today
    );

    if (index === -1) {
      habit.completedDates.push(new Date());
    } else {
      habit.completedDates.splice(index, 1);
    }

    const newStreak = calculateStreak(habit.completedDates);
    habit.streak = newStreak;
    await habit.save();

    const updatedToday = new Date().setHours(0, 0, 0, 0);
    const completedToday = habit.completedDates.some(date =>
      new Date(date).setHours(0, 0, 0, 0) === updatedToday
    );

    const responseData = Object.assign(habit.toObject(), { completedToday });

    res.status(200).json({
      message: "Habit check toggled",
      data: responseData
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Helper function to calculate streak
function calculateStreak(completedDates) {
  if (completedDates.length === 0) return 0;

  // Sort dates in descending order (newest first)
  const sortedDates = completedDates
    .map(date => {
      const d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()); // Normalize to midnight
    })
    .sort((a, b) => b - a);

  // Remove duplicates (same day)
  const uniqueDates = [];
  for (let date of sortedDates) {
    if (uniqueDates.length === 0 || date.getTime() !== uniqueDates[uniqueDates.length - 1].getTime()) {
      uniqueDates.push(date);
    }
  }

  if (uniqueDates.length === 0) return 0;

  let streak = 1;
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const diff = uniqueDates[i] - uniqueDates[i + 1];
    const diffDays = Math.round(diff / oneDayMs);
    // Allow 1 day diff (handles DST where a day can be 23 or 25 hours)
    if (diffDays === 1) {
      streak++;
    } else {
      break; // Streak broken
    }
  }

  return streak;
}

module.exports = {
    createHabit,
    getHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCheck,
    calculateStreak
}