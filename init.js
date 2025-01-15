const mongoose = require('mongoose');
const Chat = require("./models/chats.js")

  
main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = [
    {from:"gaurav",
    to :"raj",
    message :"how are you",
    created_at : new Date(),  //Automatically create any random date and time
    },
    {from:"raj",
        to :"gaurav",
        message :"I'm Good, how are you?",
        created_at : new Date(),  //Automatically create any random date and time
    },
    {from:"gaurav",
        to :"raj",
        message :"i'm good, koi kaam?",
        created_at : new Date(),  //Automatically create any random date and time
    },
    {from:"raj",
        to :"gaurav",
        message :"Aise hi msg kiya",
        created_at : new Date(),  //Automatically create any random date and time
    },
    {from:"gaurav",
        to :"raj",
        message :"acha bhai, aur batao?",
        created_at : new Date(),  //Automatically create any random date and time
    },
    {from:"raj",
        to :"gaurav",
        message :"baad me msg krta busy hu.",
        created_at : new Date(),  //Automatically create any random date and time
    },
];

Chat.insertMany(allchats);