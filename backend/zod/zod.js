const zod = require('zod');

const zodUser = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const zodSignIn = zod.object({
    username: zod.string(),
    password: zod.string()
});

const zodUpdateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

module.exports = {
    zodUser,
    zodSignIn,
    zodUpdateUser
};