async function getAllUsers(_req, res) {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function getUser(_req, res) {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function createUser(_req, res) {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function updateUser(_req, res) {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

async function deleteUser(_req, res) {
  return res
    .status(501)
    .json({ status: 'error', message: 'This route is not yet implemented' });
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
