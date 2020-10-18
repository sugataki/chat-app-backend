const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.firestore();

module.exports = {
  getMessages: async (req, res) => {
    const messages = [];
    try {
      const querySnapshot = await db.collection("messages").get();
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (err) {
      console.log(err);
    }
    res.json({
      messages,
    });
  },
  postMessage: async (req, res) => {
    const { content, user } = req.body;

    try {
      const docRef = await db.collection("messages").add({ content, user });

      const docSnapshot = await docRef.get();
      const createdMessage = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };

      res.json({
        data: createdMessage,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // helloPut: (req, res) => {
  //   res.json({ message: `hello Put @@@@@ ${req.params.id}` });
  // },
  // helloDelete: (req, res) => {
  //   res.json({ message: `hello Delete @@@@@ ${req.params.id}` });
  // },
};
