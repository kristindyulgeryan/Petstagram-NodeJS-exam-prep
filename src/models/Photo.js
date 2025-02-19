import { Schema, model, Types } from "mongoose";

const photoShema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [2, "Name must be at least 3 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: /^https?:\/\//,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: 1,
    max: 100,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: 5,
    maxLength: 50,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    minLength: 5,
    maxLength: 50,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  comments:[
    {
      user: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
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
