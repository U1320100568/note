# Three js
需要較複雜的動畫操作，才需要使用  
  
### Reference
[鐵人賽](https://ithelp.ithome.com.tw/users/20103565/ironman/1188)  
  
# WebGL
基於OpenGL電腦繪圖技術，使用js，較底層一點的語法  
three js 角色是包裝簡單的api    
大致流程:  data > shader 著色器 > GPU  
  
在 WebGL 會使用GSGL (OpenGL Shader language) 定義 shader 
會使用到c語言  
shader 是一段程式，定義圖像如何模擬著色  
vertex shader: GPU 如何解譯傳入的點，如何呈現  
fragement shader: GPU如何對三角形著色  
