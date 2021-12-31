export const safetyWrap = (unsafeFunction: Function) => {
  try {
    unsafeFunction()
  } catch (error) {
    const message = (error as Error).message ?? 'unknown error'
    console.error(message)
  }
}