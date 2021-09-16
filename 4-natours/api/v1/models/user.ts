import { model, Model, Schema } from 'mongoose';
//  TODO: linup interface with MongoDB Schema
interface User {
  _id: string;
  username: string;
}

const userSchema = new Schema<User, Model<Schema>, User>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username may not be longer than 20 characters'],
  },
});

const UserModel = model<User>('User', userSchema);

export { User };
export default UserModel;
