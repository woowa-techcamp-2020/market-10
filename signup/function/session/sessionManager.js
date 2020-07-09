const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

require("dotenv").config();

const limitMinute = parseInt(`${process.env.SESSION_EXPIRE_MIN}`);
const cycleMinute = parseInt(`${process.env.SESSION_CYCLE_MIN}`);

class SessionManager {
  constructor() {
    this.queue = [];
  }

  addKeyTodel(key) {
    this.queue.push(key);
  }

  checkOldSession(db) {
    // const adapter = new FileSync("./db/db.json");
    // const db = low(adapter);

    const now = new Date().getTime();

    const sessions = db
      .get("session")
      .filter((val) => {
        if (val.time + limitMinute * 60 * 1000 < now) {
          return val.key;
        }
      })
      .value();

    Array.from(sessions).forEach((cur) => {
      this.addKeyTodel(cur.key);
    });
  }

  delete(db) {
    // const adapter = new FileSync("./db/db.json");
    // const db = low(adapter);

    if (this.queue.length === 0) {
      return false;
    }
    const target = this.queue[0];
    this.queue.shift();

    db.get("session").remove({ key: target }).write();

    return this.delete();
  }

  startDetect() {
    const adapter = new FileSync("./db/db.json");
    const db = low(adapter);

    console.log("start detect old sessions");
    this.checkOldSession(db);

    if (this.queue.length > 0) {
      this.delete(db);
    }

    setTimeout(() => {
      this.startDetect();
    }, cycleMinute * 60 * 1000);
  }
}

const sessionManager = new SessionManager();

module.exports = sessionManager;
