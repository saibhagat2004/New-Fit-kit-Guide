import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: String,
    type: String,
    equipment_needed: String,
    body_part_targeted: [String],
    use_in_pain_or_injury: [String],
    instructions: String,
    common_mistakes: [String],
    difficulty_level: String,
    media_url: String
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
