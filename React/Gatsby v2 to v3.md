
# gatsby-image-pulgin
> gatsby-image deprecate   
> throw warning `...fiuld.. deprecate`  in build time。  
> 有時候只顯示模糊圖片  
> 所以upgrade

[offical upgrade tutorial](https://www.gatsbyjs.com/docs/reference/release-notes/image-migration-guide/)  
[tutorial gatsby v3 image api](https://www.inkoop.io/blog/gatsby-3-image-a-deep-dive-into-the-new-image-api-features/).  
[gatsby-image-plugin docs](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/).  

### Required plugin:
`gatsby-plugin-image, gatsby-transformer-sharp, gatsby-transformer-sharp, gatsby-source-filesystem` 
  
gatsby-plugin-sharp config in `gatsby-config.js`  
```js
{
resolve: `gatsby-plugin-sharp`,
options: {
  defaults: {
    formats: [`auto`, `webp`, `avif`],
    placeholder: `blurred`
    quality: 50
    breakpoints: [750, 1080, 1366, 1920]
    backgroundColor: `transparent`
    tracedSVGOptions: {}
    blurredOptions: {}
    jpgOptions: {}
    pngOptions: {}
    webpOptions: {}
    avifOptions: {}
  }
}
```
gatsby-source-filesystem config in `gatsby-config.js`
```js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `images`,
    path: `${__dirname}/static/images`, or other folder
  },
},
```

## import {StaticImage} from 'gatsby-plugin-image'
網頁靜態圖片，例如logo  
```
<StaticImage src="../images/team.png" alt="Team Picture" layout="flexible" placeholder="blurred" width={400}/>
```
尚未成功，不確定是不是white label結構關係.  
似乎src 不能用props來的data，要寫死的，如果要用傳進來的，應該要用 dymanic GatsbyImage

## import {GatsbyImage} from 'gatsby-plugin-image'
動態圖片
例如：blog image

```
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const imageQuery = graphql`
  userImage: file(relativePath: { eq: "user_01.png" }) {
    childImageSharp {
    ...
    }
`;

const UserProfile = () => {
  const data = useStaticQuery(imageQuery)
  return (    
    <GatsbyImage image={userImage.childImageSharp.gatsbyImageData} alt="Team Meeting" />
  )
}
```
如果是依照blog取得image，可參照[官方文件](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image/#using-the-gatsby-image-components)做法



### 測試
Playground : https://localhost:8000/__graphql   
可先點allFile 看看有沒有那些檔案（某個資料夾裡的圖片們），如果沒有，就是gatsby-config.js 的gatsby-plugin-filesystem 沒有設定該folder  

### StaticImage as a Component
想要將StaticImage 當作一個Component，丟檔名就可以access，不能將graphql 塞入變數（因為在compilation time graphql 就已經把資料取回，無法run time 帶入變數）.    
ex. graphql`query  { allFile: relativePath: { eq: ${filename} } }`    
-> 應該要：使用gatsby `StaticQuery` 全部query之後，再用filter or find 找到file，然後render image  
  

```jsx
import {graphql, StaticQuery} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';

return (
    <StaticQuery
      query={query}
      render={(data) => {
        let image = data.allFile.nodes.find(
          (node) => node.relativePath === filename,
        );
        return (
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            alt={alt}
            style={{width: '100%', ...extraStyle}}
          />
        );
      }}
    />
  );

```
ps. Svg向量圖檔不需要用gatsby image，或是.   
  
```js
if (!image.childImageSharp && image.extension === 'svg') {
  return <img src={image.publicURL} alt={alt} style={extraStyle} />;
}
```
