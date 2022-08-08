export const asyncSafetyWrap = async <T>(unsafeFunction: () => Promise<T>, fallback: T | undefined = undefined): Promise<T> => {
  try {
    return await unsafeFunction();
  } catch (error) {
    const message = (error as Error).message;
    console.error(message);
  }
  return fallback;
};

export const safetyWrap = <T>(unsafeFunction: () => T, fallback: T | undefined = undefined): T => {
  try {
    return unsafeFunction();
  } catch (error) {
    const message = (error as Error).message;
    console.error(message);
  }
  return fallback;
};