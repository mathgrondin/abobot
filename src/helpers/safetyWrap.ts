export const asyncSafetyWrap = async (unsafeFunction: () => Promise<any>) => {
  try {
    return await unsafeFunction();
  } catch (error) {
    const message = (error as Error).message ?? 'unknown error';
    console.error(message);
  }
};

export const safetyWrap = async (unsafeFunction: () => any) => {
  try {
    return unsafeFunction();
  } catch (error) {
    const message = (error as Error).message ?? 'unknown error';
    console.error(message);
  }
};