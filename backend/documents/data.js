const csvFilePath = "PO.csv";
const csv = require("csvtojson");
const fs = require("fs");
csv()
  .fromFile(csvFilePath)
  .then((users) => {
    var topic_id;
    var metric_id;
    var child_id;
    var data=[];

    for (let i = 0; i < users.length; i++) {

      let desc = [];
      if(users[i]["PO Number"] === ""){
        data[data.length-1].desc.push(users[i].Description);
      }else{
        desc.push(users[i]["Description"]);
      }
      
       let details = {
        "poNumber" : users[i]["PO Number"],
        "supplier" : users[i]["Supplier"],
        "desc":  desc
    }

    

    if(users[i]["PO Number"] !== ""){
      data.push(details);
    }
    
   
       
    }

    console.log(data);
    

    fs.writeFile("orders.json", JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON array is saved.");
    });
 
  
  })

  .catch((err) => {
    console.log(err);
  });
