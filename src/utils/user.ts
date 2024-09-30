import bcrypt from 'bcrypt'
import User from '../database/models/User'
import { Identifier } from 'sequelize'

// utiles for user model
export const hash = (pass: string): string => {
  return bcrypt.hashSync(pass, 10)
}

export async function userJoin(
  id: string,
  name: string,
  room: string,
  phoneNumber: number
) {
  const [user, created] = await User.findOrCreate({
    where: { phoneNumber },
    defaults: { id, name, room, phoneNumber, online: true },
  })
  if (created) {
    return user
  } else {
    await user.activate()
    return user
  }
}

export async function getCurrentUser(id: string) {
  const user = await User.findOne({
    where: { id },
  })
  return user
}

export async function getRoomUsers(room: string) {
  const users = await User.findAll({
    where: { room },
  })
  return users
}
