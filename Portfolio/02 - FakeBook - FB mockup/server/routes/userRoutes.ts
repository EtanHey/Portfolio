import express = require("express");
const router = express.Router();

import {addUser, loginUser, searchUsers,isUserLoggedIn} from '../controller/userCont'

router
.post('/add-new-user', addUser)
.post('/login-user', loginUser)
.post('/search-users', searchUsers)
.get('/is-user-logged-in', isUserLoggedIn)

export default router;