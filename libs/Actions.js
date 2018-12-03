export default async socket => {
  const { callAction } = socket
  const listActions = await callAction('listActions')
  // build object containing all actions defined as callable methods.
  console.log(listActions)
  return listActions.reduce((memo, name) => {
    memo[name] = params => callAction(name, params)
    return memo
  }, {})
}
