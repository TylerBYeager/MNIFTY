export function idbPromise(storeName, method, item) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("Mnifty", 1);
        request.onupgradeneeded = function (e) {
            const db = e.target.result;
            console.log(db)
            /*
            *** @createObjectStore: this creates the store with the name of "cart"
            ***     The keypath is set to "_id" so we can reference the specific item id to pull up any item 
            */
            const cart = db.createObjectStore("cart", { keyPath: "_id" });
            /*
            *** @createIndex: This is establishing the index that we will reference later but it's also literally not being used...
            ***     The first string can be called to retrieve everything with the same characters; the unique or not unique item name
            ***     The second string is what it's stored in the database under; the column name, where the item name is a child of that column.
            */
            cart.createIndex("ItemName", "name");
            cart.createIndex("itemDescription", "description");
            cart.createIndex("itemPrice", "price");
            cart.createIndex("itemImage", "image")
        };

        // this is what happens when it errors
        request.onerror = function (e) {
            console.log(e);
            console.error(e);
        };

        request.onsuccess = function (e) {
            console.log("this worked!!!!!!!")
            const db = request.result;
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);

            db.onerror = function (e) {
                console.log("error with", e);
            };

            switch (method) {
                case "put":
                    store.put(item);
                    resolve(item);
                    break;
                case "get":
                    const all = store.getAll();
                    all.onsuccess = function () {
                        resolve(all.result);
                    };
                    break;
                case "delete":
                    store.delete(item._id);
                    break;
                default:
                    console.log("No Valid Method detected");
                    break;
            }

            tx.oncomplete = function () {
                db.close();
            };
        };
    })
}