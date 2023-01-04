import mongoose, { Document, Schema } from 'mongoose';

export interface USER {
  name: string;
  password: string;
}

// export interface IAuthorModel extends IAuthor, Document {}

const userSchema: Schema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<USER>('User', userSchema);
