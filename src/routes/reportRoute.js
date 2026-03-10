import express from 'express';
import {Report} from '../db/reportSchema.js';

const router = express.Router();

// nedd middlewarecfor Agent or admin
router.post('/report/form', async(req, res) => {
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});








router.post('/report/csv');
router.get('/filter');
router.get('/:id')