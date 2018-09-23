import mongoose from 'mongoose';

const myDsrSchema = mongoose.Schema;

let issue = new myDsrSchema ({
        title : {
            type: String
        },
        responsible : {
            type: String
        },
        description : {
            type: String
        },
        severity : {
            type: String
        },
        status :{
            type: String,
            default: 'Open'
        }
    }
);

export default mongoose.model('issue',issue);