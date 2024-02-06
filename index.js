const express = require('express');
const multer= require('multer')
const ejs = require('ejs');
const tesseract = require("node-tesseract-ocr")
const path= require('path')

const cv = require('opencv4nodejs');
// Load the image using OpenCV
const image = cv.imread('your_image.jpg');

// Preprocess the image (convert to grayscale and apply thresholding)
const grayImage = image.cvtColor(cv.COLOR_BGR2GRAY);
const thresholdImage = grayImage.threshold(150, 255, cv.THRESH_BINARY);





const app = express();
const port = 3000;

// Define a route


app.use(express.static(path.join(__dirname +'/uploads')))




app.set('view engine', "ejs"); // Set to your view engin e (ejs, pug, etc.)


const storage= multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"uploads")
    },
    filename: function(req,file,cb){
        cb(null, 
            file.fieldname+"-"+Date.now()+path.extname(file.originalname)
            );
    },
});


const upload=multer({storage:storage})



app.get('/', (req, res) => {

   
    res.render('index', { data: '' });

    
    });

app.post('/extracttextfromimage',upload.single('file'),(req,res)=>{
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
      }
      





      // Use Tesseract OCR to extract text
      tesseract.recognize(
        thresholdImage.toBuffer(),
        'eng',
        { logger: info => console.log(info) }
      ).then(({ data: { text } }) => {
        console.log('Extracted Text:', text);
      
        // Identify checkbox ROIs and extract checkbox ticks
        // (You may need additional logic to determine checkbox ticks)
      
        // Identify text input ROIs and extract text
        // (You may need additional logic to identify input fields)
      
        // Your custom logic goes here based on the OCR results
      });
  










    






      // tesseract
      //   .recognize(req.file.path, config)
      //   .then((text) => {
      //     console.log("Result:", text)
      //     res.render('index',{data:text})
      //   })
      //   .catch((error) => {
      //     console.log(error.message)
      //   })




    // const img = fs.readFileSync("image.jpg")

    // tesseract
    //   .recognize(img, config)
    //   .then((text) => {
    //     console.log("Result:", text)
    //   })
    //   .catch((error) => {
    //     console.log(error.message)
    //   })



      
      
    console.log(req.file.path)

})




// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
