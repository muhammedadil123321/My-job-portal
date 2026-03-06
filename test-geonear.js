const mongoose = require("mongoose");
const Job = require("./backend/src/models/Job");
const User = require("./backend/src/models/User");

mongoose.connect("mongodb://localhost:27017/jobportal").then(async () => {
    try {
        const jobs = await Job.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [75.89351402742011, 11.151937200735828]
                    },
                    distanceField: "distance",
                    maxDistance: 500000,
                    spherical: true,
                    query: {
                        jobStatus: "active",
                        isActive: true
                    }
                }
            }
        ]);
        console.log("Jobs found by geoNear:", jobs.length);
        if (jobs.length > 0) {
            console.log("First job distance:", jobs[0].distance);
            console.log("First job keys:", Object.keys(jobs[0]));
        }
    } catch (e) {
        console.error("GeoNear Error:", e);
    }
    mongoose.disconnect();
}).catch(e => console.error(e));
