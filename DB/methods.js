const mongoose = require('mongoose')
class qmDB {
    constructor(options) {
      mongoose.connect(options.uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }).then(console.log('Connected to qmDB ✅'))
      this.model = require(require('path').join(__dirname, 'schema.js'))
    }
  /**
   * @method
   * @param {String} [key] The key, so you can get it with <MongoClient>.get("key")
   * @param {*} [value] The value which will be saved to the key
   * @example

   */
    async set(key, value) {
        if(!key) throw new TypeError(`qmDB Please specify a "key"`)
        if(!value) throw new TypeError(`qmDB Please specify a "value"`)
        this.model.findOne({ key : key }, async(err, data) => {
            if(err) throw err;
            if(data) {
                data.value = value;
                data.save()
            } else {
                data = new this.model({key : key, value : value})
                data.save()
            }
        })
    }
      /**
   * @method
   * @param {String} key The key you wish to get, and returns value
   * @example

   */
    async get(key) {
        if(!key) throw new TypeError(`qmDB Please specify a "key"`)
        let DATA;
        const data = await this.model.findOne({ key : key })
            .catch(err => console.log(err))
        if(data) {
            DATA = data.value
        } else {
            DATA = undefined;
        }
        return DATA;
    }
      /**
   * @method
   * @param {String} key The key you wish to check, returns boolean
   * @example
   * <qmDB>.has("test") // will return true if there is a key
   */
    async has(key) {
        if(!key) throw new TypeError(`qmDB Please specify a "key"`)
        return !!(await this.get(key))
    }

      /**
   * @method
   * @param {String} key They key you wish to delete
   * @example
   * <qmDB>.delete("test")
   */

    async delete(key) {
        if(!key) throw new TypeError(`qmDB Please specify a "key"`)
        this.model.findOne({ key: key}, async(err, data) => {
            if(err) throw err;
            if(data) {
                this.model.findOneAndDelete({ key : key })
                    .catch(err => console.log(err))
            } else {
                throw new TypeError(`qmDB Data does not exist`)
            }
        })
    }
}
module.exports = qmDB;