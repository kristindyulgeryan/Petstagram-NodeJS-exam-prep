import Photo from "../models/Photo.js";

export const getAll = () => Photo.find({}).populate("owner");

export const create = (photoData, userId) =>
  Photo.create({ ...photoData, owner: userId });

const photoService = {
  getAll,
  create,
};

export default photoService;
