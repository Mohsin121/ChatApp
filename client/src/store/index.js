const user = localStorage.getItem("user");
const loggedInUser = JSON.parse(user);

export default loggedInUser;
