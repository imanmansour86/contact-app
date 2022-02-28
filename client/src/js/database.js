// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () =>
  openDB("contactdb", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contactdb")) {
        console.log("contact database already exists");
        return;
      }
      db.createObjectStore("contactdb", { keyPath: "id", autoIncrement: true });
      console.log("contact database created");
    },
  });

// TODO: Complete the postDb() function below:
export const postDb = async (name, home_phone, cell_phone, email) => {
  console.log("POST all from the database");
  const contactDb = await openDB("contactdb", 1);
  const tx = contactDb.transaction("contactdb", "readwrite");
  const store = tx.objectStore("contactdb");
  const request = store.add({
    name: name,
    cell_phone: cell_phone,
    home_phone: home_phone,
    email: email,
  });
  const result = await request;
  if (result) {
    console.log("result", result);
    return result;
  } else {
    console.error("getDb not implemented");
  }
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log("GET all from the database");
  const contactDb = await openDB("contactdb", 1);
  const tx = contactDb.transaction("contactdb", "readonly");
  const store = tx.objectStore("contactdb");
  const request = store.getAll();
  console.log(request.name);
  const result = await request;
  if (result) {
    console.log("result", result);
    return result;
  } else {
    console.error("getDb not implemented");
  }
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log("DELETE all from the database");
  const contactDb = await openDB("contactdb", 1);
  const tx = contactDb.transaction("contactdb", "readwrite");
  const store = tx.objectStore("contactdb");
  const request = store.delete(id);
  const result = await request;
  if (result) {
    console.log("result", result);
    return result;
  } else {
    console.error("getDb not implemented");
  }
};

initdb();
