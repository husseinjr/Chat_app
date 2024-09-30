import { db } from './dbCon'


db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => console.log('Unable to connect to the database: ', err))


db.sync()
  .then(() => {
    console.log('Sync successfully')
  })
  .catch((err) => {
    console.log('Error in sync ' + err)
  })

  export default db