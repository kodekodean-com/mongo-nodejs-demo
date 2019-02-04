const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser:true})
    .then(()=>{console.log('Connected to MongoDB')})
    .catch(err => console.log('Could not connected to MongoDB',err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date: {type: Date, default:Date.now},
    isPublished: Boolean
});

// Classes, Object
// Course, nodeCourse

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name :'Angular Course',
        author:'rxs1',
        tags:['Angular','frontend'],
        isPublished:true
    });
    
    const result = await course.save();
    console.log(result);
}

//createCourse();

async function getCourses(){
    // eq (equal)
    // ne (note equeal)
    // gt (greater than)
    // gte (greater than or equal)
    // lt (less than)
    // lte (less than or equal)
    // in 
    // nin (not in)

    // Logical operator
        //or and
    
    const courses = await Course
    .find({author:'rxs1', isPublished:true})
    // .find({price :{$gte:10, $lte:20}})
    // .find({price: {$in :[10, 15, 20]}})
    // .find().or([{author:'rxs1'},{isPublished:true}])
    // .find({author:/^rxs1/ }) //start with rxs1
    // .find({author:/rahman^/i }) // end with rahman
    // .find({author:/.*rxs1.*/i}) // contains rxs1
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1});
    // .count(); // remove select methhod to use count
    console.log(courses);
}

getCourses();
