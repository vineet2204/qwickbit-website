const allowLocal = !true

const devMode =  process.env.NEXT_PUBLIC_DEV_MODE
const isLocal = allowLocal && devMode


export const $devMode = devMode   
export const $isLocal = isLocal
export const $hasWindow  = typeof window !== 'undefined'
export const $firestoreUrl = isLocal ? `http://localhost:8079/v1` : `https://firestore.googleapis.com/v1`
export const $storageUrl = isLocal ? `http://localhost:9199/v0/b` : `https://firebasestorage.googleapis.com/v0/b`