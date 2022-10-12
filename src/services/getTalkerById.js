const getTalkerById = (talkers, id) => {
  const response = talkers.find((talk) => Number(talk.id) === Number(id));
  return response;
};

module.exports = getTalkerById;