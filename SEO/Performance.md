

## 改善bundle size
- library : bundle-webpack-analyzer 分析bundle js 有多大(可看starter project npm run stat)
- import icon explicit path

## 減少 redirect 次數
- netlify cdn 很嚴格路徑不對會再次redirect，gatsby build page 會是 `/order/` (會是 /order/index.html，不是 /order.html) ，所以navigte `/order` 會被redirect `/order/`
- netlify domain setting : 要和 primary domain 一致也很重要，BE 要注意有無 `www.`
