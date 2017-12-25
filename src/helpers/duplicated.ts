const duplicated = (a: number[], b: number[]): boolean => a.every((ai, indx) => ai === b[indx])

export default duplicated
