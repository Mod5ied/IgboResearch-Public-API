import { default as mongoose } from "mongoose";

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
  //todo: would be required after we setup apps dictionary
  definitions: {
    type: String,
    // required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});
const Posts = mongoose.model("Posts", PostSchema);

export default Posts;
