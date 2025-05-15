const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    company:{
      type:String,
      required:true,
    },
    job_title:{
      type:String,
      required:true,
    },
    experience_required_1:{
      type:Number,
      required:true,
    },
    experience_required_2:{
      type:String,
      required:true,
    },
    salary:{
      type:Number,
      required:true,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
    }
},
  { timestamps: true }
);

const jobs = mongoose.model("jobs", jobsSchema);

module.exports = jobs;