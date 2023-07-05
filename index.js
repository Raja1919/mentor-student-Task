import  express from "express";
import {studentRouter}  from "./Router/routes.js";
import dotenv from "dotenv"

dotenv.config();
const port=process.env.port

const app=express();



app.use(express.json())

app.use('/',studentRouter)

app.listen(port,()=>console.log(`server started in localhost:${port}`))


// ------------------------------------------
// Assign student to mentor:
// router.post('/assign-student-to-mentor', async (req, res) => {
//     try {
//       const { studentId, mentorId } = req.body;
  
//       const mentor = await client
//         .db(databaseName)
//         .collection('mentors')
//         .findOne({ mentorId });
  
//       const student = await client
//         .db(databaseName)
//         .collection('students')
//         .findOne({ studentId });
  
//       if (!mentor || !student) {
//         return res.status(404).json({ message: "Mentor or student not found" });
//       }
  
//       await client
//         .db(databaseName)
//         .collection('students')
//         .updateOne(
//           { studentId },
//           { $set: { mentorName: mentor.mentorName } }
//         );
  
//       await client
//         .db(databaseName)
//         .collection('mentors')
//         .findOneAndUpdate(
//           { mentorId },
//           { $push: { studList: student.studentName } } 
//         );
  
//       res.status(200).json({ message: "Student assigned to mentor successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  
  
  


// Change Mentor for a Student:
// router.put("/change-mentor/:studentId", async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const { newMentorName } = req.body;

//     const student = await client
//       .db(databaseName)
//       .collection("students")
//       .findOne({_id:new ObjectId(studentId)});

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const newMentor = await client
//       .db(databaseName)
//       .collection("mentors")
//       .findOne({ mentorName: newMentorName });

//     if (!newMentor) {
//       return res.status(404).json({ message: "New mentor not found" });
//     }

//     await client
//       .db(databaseName)
//       .collection("students")
//       .updateMany({ _id: new ObjectId(studentId) }, { $set: { mentorName: newMentor.mentorName } });

//     await client
//       .db(databaseName)
//       .collection("mentors")
//       .updateOne(
//         { mentorName: newMentor.mentorName },
//         { $push: { "stud-List": student.studentName } }
//       );

//     res.status(200).json({ message: "Mentor changed successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Get All Students for a particular Mentor:
// router.get("/students-for-mentor", async (req, res) => {
//   try {
//     const { mentorName } = req.query;

//     const mentor = await client
//       .db(databaseName)
//       .collection("mentors")
//       .findOne({ mentorName });

//     if (!mentor) {
//       return res.status(404).json({ message: "Mentor not found" });
//     }

//     const students = await client
//       .db(databaseName)
//       .collection("students")
//       .find({ mentorName })
//       .toArray();

//     if (!students) {
//       return res.status(400).json({ message: "No students found for the mentor" });
//     }

//     res.status(200).json(students);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// Get Previously Assigned Mentor for a particular Student:
// router.get("/previous-mentor/:studentId", async (req, res) => {
//     try {
//       const { studentId } = req.params;
  
//       const student = await client
//         .db(databaseName)
//         .collection("students")
//         .findOne({ _id: new ObjectId(studentId) });
  
//       if (!student) {
//         return res.status(404).json({ message: "Student not found" });
//       }
  
//       const previousMentor = await client
//         .db(databaseName)
//         .collection("mentors")
//         .findOne({ mentorName: student.mentorName });
  
//       if (!previousMentor) {
//         return res.status(404).json({ message: "Previous mentor not found" });
//       }
  
//       res.status(200).json({ previousMentor });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  