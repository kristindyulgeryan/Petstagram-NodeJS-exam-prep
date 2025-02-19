import { Schema, model, Types } from "mongoose";

const photoShema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  commentList:[
    {
      userId: {
        type:Types.ObjectId,
        requried: true
      },
      comment: {
          type: String,
          required: [true, "Comment is required"],
        }
      },
]
});

const Photo = model("Photo", photoShema);

export default Photo;
