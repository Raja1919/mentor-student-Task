import express from "express";
import { client } from "../db.js";


const router = express.Router();
const databaseName = "mentor-student-task";

// Get All Students List:
router.get("/all-students", async (req, res) => {
  try {
    const students = await client
      .db(databaseName)
      .collection("students")
      .find()
      .toArray();
      
    if (!students) {
      return res.status(400).json({ message: "No data available" });
    }
    
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// ------------------------------------------------------------
// Get All Mentors List:
router.get("/all-mentors", async (req, res) => {
  try {
    const mentors = await client
      .db(databaseName)
      .collection("mentors")
      .find()
      .toArray();
      
    if (!mentors ) {
      return res.status(400).json({ message: "No data available" });
    }
    
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// ------------------------------------------------------
// Add student:
router.post('/add-student', async (req, res) => {
  try {
    const newStudent = req.body;
    
    if (!newStudent) {
      return res.status(400).json({ message: "No data provided" });
    }
    
    const result = await client
      .db(databaseName)
      .collection('students')
      .insertOne(newStudent);
    
    if (!result) {
      return res.status(400).json({ message: "Error adding data" });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// -----------------------------------------------------------------------------
// Add mentor:
router.post('/add-mentor', async (req, res) => {
  try {
    const newMentor = req.body;
    
    if (!newMentor) {
      return res.status(400).json({ message: "No data provided" });
    }
    
    const result = await client
      .db(databaseName)
      .collection('mentors')
      .insertOne(newMentor);
    
    if (!result) {
      return res.status(400).json({ message: "Error adding data" });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// -------------------------------------------------------------------
// Assign student to mentor:
router.post('/assign-student-to-mentor', async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    const mentor = await client
      .db(databaseName)
      .collection('mentors')
      .findOne({ mentorId });

    const student = await client
      .db(databaseName)
      .collection('students')
      .findOne({ studentId });

    if (!mentor || !student) {
      return res.status(404).json({ message: "Mentor or student not found" });
    }

    await client
      .db(databaseName)
      .collection('students')
      .updateOne(
        { studentId },
        { $set: { mentorName: mentor.mentorName } }
      );

    await client
      .db(databaseName)
      .collection('mentors')
      .updateOne(
        { mentorId },
        { $push: { students: student.studentName } }
      );

    res.status(200).json({ message: "Student assigned to mentor successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ---------------------------------------------------------------------
// Change mentor for a student:
router.put('/change-mentor/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const mentor = await client
      .db(databaseName)
      .collection('mentors')
      .findOne({ mentorId });

    const student = await client
      .db(databaseName)
      .collection('students')
      .findOne({ studentId });

    if (!mentor || !student) {
      return res.status(404).json({ message: "Mentor or student not found" });
    }

    await client
      .db(databaseName)
      .collection('students')
      .updateOne(
        { studentId },
        { $set: { mentorName: mentor.mentorName } }
      );

    // Remove the student from the previous mentor's students array
    await client
      .db(databaseName)
      .collection('mentors')
      .updateOne(
        { students: student.studentName },
        { $pull: { students: student.studentName } }
      );

    // Add the student to the new mentor's students array
    await client
      .db(databaseName)
      .collection('mentors')
      .updateOne(
        { mentorId },
        { $push: { students: student.studentName } }
      );

    res.status(200).json({ message: "Mentor changed successfully for the student" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// -------------------------------------------------------------------------
// Get all students for a particular mentor:
router.get('/students-for-mentor/:mentorId', async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await client
      .db(databaseName)
      .collection('mentors')
      .findOne({ mentorId });

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const students = await client
      .db(databaseName)
      .collection('students')
      .find({ mentorName: mentor.mentorName })
      .toArray();

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------------------------------------------------------
// Get previous assigned mentor for a student:
router.get('/previous-mentor/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await client
      .db(databaseName)
      .collection('students')
      .findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.mentorName) {
      return res.status(404).json({ message: "Previous mentor not found" });
    }

    const previousMentor = await client
      .db(databaseName)
      .collection('mentors')
      .findOne({ mentorName: student.mentorName });

    if (!previousMentor) {
      return res.status(404).json({ message: "Previous mentor not found" });
    }

    res.status(200).json(previousMentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});








export const studentRouter = router;
