export const GenerateUserData = data => {
  const users = {};
  for (const user of Object.values(data)) {
    users[user.id] = {...user};
  }
  return users;
}
