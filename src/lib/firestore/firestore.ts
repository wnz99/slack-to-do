import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

import { Config } from '../../config'

export { serverTimestamp } from 'firebase/firestore'

export const initFirestore = (config: Config['firestore']) => {
  initializeApp({
    credential: cert(config.serviceAccount as ServiceAccount),
  })

  return getFirestore()
}
