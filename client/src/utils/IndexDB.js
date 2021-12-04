
// Change product item and categories display method


export function idbPromise(storeName,Method,object){
    return new Promise((resolve, reject) => {

        const request = window.indexedDB.open("Mnifty", 1);

        // pre-declaring variables that'll be used in nested functions.
        let db;
        let tx;
        let store;
        request.onupgradeneeded = function (e) {
            // a console log for redundancy
            console.log("this is the update")

            const db = e.target.result;

            console.log(db)

            // beep boop beep boop
            console.log("BEEP BOOP BEEP BOOP")


            /*
            *** @createObjectStore: this creates the store with the name of "cart"
            ***     The keypath is set to "_id" so we can reference the specific item id to pull up any item   -(I think. likely... probably.....)
            ***         ("it's better to set it to something unique so no unexpected duplicates show up")
            */

            const cart = db.createObjectStore("cart", {keyPath: "_id"} );


            /*
            *** @createIndex: This is establishing the index that we will reference later
            ***     The first string can be called to retrieve everything with the same characters; the unique or not unique item name
            ***     The second string is what it's stored in the database under; the column name, where the item name is a child of that column.
            */


            cart.createIndex("ItemName", "name");
            cart.createIndex("itemDescription", "description");
            cart.createIndex("itemPrice", "price");
            cart.createIndex("itemImage", "image")

            // cart.add({name: "horse", description:"this is a horse", price: 3, image: ".jpg"})
        };


        // this is what happens when it errors
        request.onerror = function (e) {
            console.log("there was a huge error or something")
        };

        request.onsuccess = function (e) {
            console.log("this worked!!!!!!!")
            const db = request.result;
            const transaction = db.transaction([""], "readwrite");
            const cart = transaction.objectStore("");

            // const priceitemPriceIndex = cart.index("");
            // const ItemName = cart.index("");
            // const itemDescription = cart.index("");
            // const itemImage = cart.index("");

        };
    })
}