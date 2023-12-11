import { User } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'

import { auth, db } from '../../firebase'

import { Subscription } from '../store/types'

export const getSubscriptions = async () => {
  const user = auth.currentUser as User

  return (await getDocs(collection(db, 'users', user.uid, 'subscriptions')).then((querySnapshot) =>
    querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  )) as Array<Subscription>
}
