import { MongoClient } from "mongodb";

export async function dbConnect() {
    return await MongoClient.connect("mongodb+srv://deniswmonteiro:woftam-corMat-1pipna@cluster0.cwxr3dv.mongodb.net/ectomonster-db");
}

export async function getId(description: string, db: any) {
    const sequenceCollection = db.collection("sequence");
    const sequence = await sequenceCollection.findOne({ description });
    let newSequence;

    if (!sequence) {
        await sequenceCollection.insertOne({
            description,
            value: 1
        });
    }

    else {
        const sequenceValue = Number(sequence.value) + 1;
        
        await sequenceCollection.updateOne({ description }, {
            $set: {
                value: sequenceValue
            }
        });
    }

    newSequence = await sequenceCollection.findOne({ description });

    return newSequence.value;
}