import express from 'express';
import {Report} from '../db/reportSchema.js';
import {parse} from "csv-parse/sync";
import {checkAdmin, isAuth} from '../middlewre/authMiddleware.js'

const router = express.Router();


router.post('/report/form', isAuth, async(req, res) => {
    try {
        const {category, urgency, message, sourceType} = req.body;

        if (!category || !urgency || !message) {
            return res.status(400).json({message: "missing details"})
        }

        let imagePath = null;
        const userId = req.user.id;
        // medd muddlewRE for for form
        if (req.files && req.files.image) {
            const image = req.files.image;
            imagePath = "uploads/" + "-" + image.name;
            await image.mv()
        }

        const report = await Report.create({
            userId,
            category,
            urgency,
            message,
            imagePath,
            sourceType: sourceType || 'agent',
        });
        res.status(200).json(report)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/report/csv', isAuth, async (req, res) => {
    try {
        if (!req.files && !req.files.file) {
            return res.status(400).json({message: "missing details"})
        }

        const fileCsv = req.files.file;
        const userId = req.user.id;
        const csvToString = fileCsv.data.toString("utf-8")

        const rows = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });

        const createReport = rows.map((r) => ({
            userId,
            category: r.category,
            urgency: r.urgency,
            message: r.message,
            sourceType: "csv"
        }))

        const newReports = await Report.insertMany(createReport)
        res.status(200).json({message: "reports save", newReports})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
});


router.get('/filter', isAuth, async(req,res)=> {
    try {
        const role = req.user.role;
        if (!role){
            return res.status(400).json({message: "not aloud"})
        }
        let repoert;
        if(role=== "admin"){
            repoert = await Report.find();
        } else {
            repoert = await Report.find({userId: req.user.id})
        }


        if (req.query.agentCode && role === "admin") {
            repoert = repoert.filter((r) => r.agentCode === req.query.agentCode)   
        }
        if(req.query.urgency) {
            repoert = repoert.filter((r) => r.urgency === req.query.urgency)
        }
        if (req.query.category) {
            repoert = repoert.filter((r) => r.category === req.query.category)
        }
        res.status(200).json(repoert)
    } catch (error) {
        res.status(500).json({error})
    }
});

// router.get('/:id', isAuth)