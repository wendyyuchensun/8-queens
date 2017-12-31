# 8-Queens
計算八皇后的 12 個獨立解。 計算與渲染網頁所用的大約時間，也呈現在網頁上。
https://goo.gl/H2YKkY

## CLI 版
On master branch, run `npm install` then `npm run start`. You should see all 12 solutions & time used
to calculate solutions appear in your console.

Solutions are being denoted in the form of array. Indexes of each array are of the indexes of columns, while values of the array
means indexes of row. `[0, 1, 2, 3, 4, 5, 6, 7]` means indexes of the 8 queens in this solution are
`[0, 0], [1, 1], [2, 2]...`, etc.
