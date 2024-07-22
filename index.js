import a from './src/first'
import './src/assets/css/index.css'
import './src/assets/images/aa.jpg'

const sum = (a, b )=>{
  return a + b 
}
new Promise(resolve=>{
  setTimeout(()=>{
    resolve(1)
  },1000)
})
sum(1,2)

