import mongoose, { Schema, Document, Model } from 'mongoose';

interface IHangman extends Document {
    game_name:string,
    question:string,
    options:[string],
    blankWords:[string],
    difficulty:string,
    articleReferences:[string],
    institution:string
}

const HangmanSchema: Schema<IHangman> = new Schema(
    {
        game_name: {
            type: String,
            enum: ['hangman'],
            required: true
        },
        question: {
            type: String,
            required: true
        },
        options: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length === 8;
                },
                message: props => `Options array must contain exactly 8 items, but got ${props.value.length}.`
            }
        },
        blankWords: {
            type: [String],
            required: true
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: true
        },
        articleReferences: {
            type: [Number],
            required: true
        },
        institution: {
            type: String,
            enum: ['legislature', 'executive', 'judiciary'],
            required: true
        }
    }, { collection: 'games' }
);

const Hangman: Model<IHangman> = mongoose.models.Hangman || mongoose.model<IHangman>('Hangman', HangmanSchema);

export default Hangman;
