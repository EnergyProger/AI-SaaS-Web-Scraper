export const errorHandler = (error: unknown) => {
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  }

  return message;
};
