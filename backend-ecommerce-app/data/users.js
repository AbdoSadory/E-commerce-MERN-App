import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Abdelrhman Sayed',
    email: 'abdo@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ahmed Sultan',
    email: 'ahmed@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Mohamed Sultan',
    email: 'mohamed@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
