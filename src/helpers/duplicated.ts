const duplicated = (a: number[], b: number[]): boolean => {
  return a.every((ai: number, indx: number): boolean => ai === b[indx])
}

export default duplicated
