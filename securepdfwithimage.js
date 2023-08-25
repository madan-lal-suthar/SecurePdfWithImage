
 try{
     
                let puppeteer = require("puppeteer");
                const browser = await puppeteer.launch({headless: 'new'});
                const page = await browser.newPage();
                
                await page.setViewport({width: 820, height: 480});

                await page.setContent(htmlFormat); //html
                await page.screenshot({path:`./exmpublic.png`})
                await page.close();
                await browser.close();

                const PDFDocument = require('pdfkit');
                let options= {
                    size : [layout.width-200,layout.height-200],
                    ownerPassword: "123456",
                    userPassword : "123456"
                }
                const doc = new PDFDocument(options);

                // doc.text('Hello, World!');      
                const imageOptions = {
                  width: layout.width-200,   // Set the desired width
                  height: layout.height-200,
                   align: 'start',
                    valign: 'start'  // Set the desired height
                };
                
                doc.image(`./exmpublic.png`,0,1,imageOptions) 
                // ,0,0,{
                  // fit: [250, 300],
                  // align: 'center',
                  // valign: 'center'  
                  // fit: [700, 200],
                    // width: "600",
                    // align: 'start',
                    // valign: 'start'
                // });
                doc.pipe(fs.createWriteStream(`./outputexmpublic.pdf`));
                doc.end();
            }catch(err){
                resolve({error: 0})
                res.send("error");
            }
