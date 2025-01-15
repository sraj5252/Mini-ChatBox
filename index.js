const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chats.js")
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1 = new Chat({from:"neha",
//     to :"priya",
//     message :"how are you", 
//     created_at : new Date(),  //Automatically create any random date and time
// });

// chat1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err) =>{
//     console.log(err);
// });

//Index Routing
app.get("/chats" , async (req,res)=>{
   let chats = await Chat.find();
//    console.log(chats);
   res.render("index.ejs", {chats});
});

//New Chat Routing
app.get("/chats/new" ,(req,res)=>{
    res.render("new.ejs");
});

//Create route
app.post("/chats" , (req,res)=>{
    let {from,to,msg} = req.body;  //parse the data from req.body using  app.use(express.urlencoded({extended:true}));
    let newchat = new Chat(
        {
            from:from,
            to : to,
            message : msg,
            created_at : new Date(),
        }
    );
    console.log(newchat);
    newchat
    .save()  //this is asynchronous function,but still we are not using await function as then is used here so no need to use awit keyword.
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//Edit route 
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);  //Chat find krne me asynchronous hojata isiliye we use await keyword
 res.render("edit.ejs", {chat});
});

//Update Route
app.put("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let {msg: newmsg} = req.body;
    console.log("Message to update:", newmsg); // Ensure this logs the correct value

    let updatedChat = await Chat.findByIdAndUpdate(id, 
        {message: newmsg},
        {runValidators: true, new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

//Delete Route
app.delete("/chats/:id" , async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});
app.get("/" ,(req,res)=>{
    res.send("Get Response");
});

app.listen( 8081, ()=>{
    console.log("Server is listening");
});