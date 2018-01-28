# 8-Queens
Compute different fundamental solutions to 8 queens puzzle in TypeScript.

## Run in Browser
https://goo.gl/H2YKkY

## Run in CLI
Clone this repo and navigate to its root. On master branch, run `npm install` then `npm run start`. You should see all 12 solutions & time used to calculate solutions appear in your console.

Solutions are being denoted in the form of array. Indexes of each array are of the indexes of columns, while values of the array means indexes of row. `[0, 1, 2, 3, 4, 5, 6, 7]` means indexes of the 8 queens in this solution are
`[0, 0], [1, 1], [2, 2]...`, etc.
