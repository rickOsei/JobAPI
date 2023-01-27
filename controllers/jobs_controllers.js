// getAllJobs
// getJob
// createJob
// updateJob
// deleteJob

const getAllJobs = async (req, res) => {
  res.status(200).send("access all jobs");
};
const getJob = async (req, res) => {
  res.status(200).send("access job");
};
const createJob = async (req, res) => {
  res.status(200).send("create job");
};
const updateJob = async (req, res) => {
  res.status(200).send("update job");
};
const deleteJob = async (req, res) => {
  res.status(200).send("delete job");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
