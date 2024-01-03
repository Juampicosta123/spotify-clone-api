const getFormatedId = (id) => {
    return id.toString().split('(')[0]
}

module.exports = { getFormatedId }
  