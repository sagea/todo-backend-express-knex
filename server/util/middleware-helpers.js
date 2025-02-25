
export const middleware = (middlewareMethod) => {
  return async (req, res, next) => {
    try {
      await middlewareMethod(req, res, next)
    }catch (err) {
      next(err)
    }
  }
}