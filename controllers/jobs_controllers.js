const jobModel = require("../model/job_model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequest } = require("../errors");

const getAllJobs = async (req, res) => {
  const { userId } = req.user;
  const jobs = await jobModel.find({ createdBy: userId });
  res.status(StatusCodes.CREATED).json({ user: req.user.name, data: jobs });
};
const getJob = async (req, res) => {
  const {
    params: { id },
    user: { userId },
  } = req;
  const job = await jobModel.findOne({ _id: id, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`Job with id:${id} not found`);
  }
  res.status(StatusCodes.CREATED).json({ user: req.user.name, data: job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await jobModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user: req.user.name, data: job });
};
const updateJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
    body: { company, position },
  } = req;

  if (!company || !position) {
    throw new BadRequest("Company or Position fields cannot be empty");
  }
  const job = await jobModel.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`Job with id:${jobId} not found`);
  }
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await jobModel.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`Job with id:${id} not found`);
  }
  res.status(StatusCodes.CREATED).json({ user: req.user.name, data: job });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
