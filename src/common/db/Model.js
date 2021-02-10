import Validator from 'validatorjs';
import db from './index'

export default class Model {

    //https://pouchdb.com/2014/05/01/secondary-indexes-have-landed-in-pouchdb.html
    //https://github.com/pouchdb-community/relational-pouch
    //https://pouchdb.com/api.html#create_document
    //https://pouchdb.com/api.html#fetch_document

    constructor(intialData) {
        this._hasChanged = false;
        if (intialData) {
            if (intialData._id) {
                this.setID(intialData._id);
                delete intialData._id;
            }

            this.data(intialData);
        }
        else
            this._data = {};
    }

    readDB(useLiveDB) {
        if (useLiveDB) {
            if (this.constructor.LIVE_DB)
                return this.constructor.LIVE_DB
            else
                throw new Error(`No "LIVE_DB" is not defined on the model.`);
        }

        return this.constructor.DB || db;
    }

    writeDB(useLiveDB) {
        if (useLiveDB) {
            if (this.constructor.LIVE_DB)
                return this.constructor.LIVE_DB
            else
                throw new Error(`No "LIVE_DB" is not defined on the model.`);
        }
        return this.constructor.DB || db;
    }

    get _resource() {
        return this.constructor.resource();
    }

    get _schema() {
        try {
            return this.constructor.SCHEMA || {};
        } catch (err) {
            console.log(err);
            //throw new Error(`"ModelSchema" is not defined.`);
        }
    }

    //SET FIELD VALUE
    set(field, value) {
        this.data({ [field]: value });
    }

    //GET FIELD DATA
    get(field) {
        return this._data[field];
    }

    //SET _id VALUE
    setID(value, raw) {
        if (!value)
            value = generateTimestamp();
        //TODO: check if raw value matches the serialize format
        this._id = raw ? value : formatID(this._resource, value);
    }

    getID() {
        return this._id || "";
    }

    get isNew() {
        return !this._id;
    }

    getTimestamp(asDate = true) {
        let endOfDateIndex = this.getID().indexOf('Z!');
        let result = "";
        if (endOfDateIndex > 0)
            result = this.getID().substring(this.getID().indexOf('_') + 1, endOfDateIndex + 1);
        else
            result = this.getID().substring(this.getID().indexOf('_') + 1);

        return asDate ? new Date(result) : result;
    }

    getUser(userData = true) {
        const idx = this.getID().split("!");
        if (idx > 0) {
            if (userData) {
                //load user data based on the last part of the id
                //
            }
            return idx[1];
        }
        return null;
    }

    //see point for on attachemtns: https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html
    //https://github.com/nolanlawson/blob-util
    getAttachmentAsBlob(filename, options) {
        if (this._id)
            return this.readDB().getAttachment(this._id, filename);

        return Promise.resolve(null);
    }

    //MUST INCLUDE { attachments: true } WHEN LOADING THE MODEL DATA
    getAttachments(filename, raw = false) {
        if (this._data['_attachments']) {
            if (filename) {
                const attachment = this._data['_attachments'][filename];
                //non-raw is equivalet to FileReader.readAsDataURL
                return raw ? attachment : `data:${attachment.content_type};base64,${attachment.data}`;
            }

            let attachments = [];
            this._data['_attachments'].forEach(attachment => {
                attachments.push(raw ? attachment : `data:${attachment.content_type};base64,${attachment.data}`)
            });
            return attachments;
        } else {
            console.warn("No files attached or you forgot to add: { attachments: true }");
        }

        return null;
    }

    addAttachment(fileName, fileType, fileData) {
        this._data._attachments = {
            ...this._data._attachments,
            [fileName]: {
                content_type: fileType,
                data: fileData
            }
        }

        this._hasChanged = true;
    }

    addAttachments(attachments) {
        this._data._attachments = attachments;//REPLACE ATTACHMENTS
        this._hasChanged = true;
    }

    //REPLACE DATA AND RETURN
    data(inputData, validate) {
        if (inputData) {
            if (this._schema.fields) {
                if (inputData._id) {
                    console.warn('The raw "_id" field will be ignored. Please either provided as an argument on initiation or through the "setID" method as a raw value.')
                    delete inputData._id;//direct setting of _id is ignored
                }

                const mappedData = mapFieldsToSchema(this._schema.fields, inputData, this._data, this._schema.mode || "extract", validate);
                this._hasChanged = mappedData.hasChanged;
                this._data = {...mappedData.data};
            }
            else //if no fields specified there is nothing to compare to
                this._data = { ...this._data, ...inputData };
        }

        return this._data;
    }

    load(id, options = {}, raw = true) {
        if (id) {
            try {
                if (!raw)
                    id = formatID(this._resource, id);

                const {
                    useLiveDB = false,
                    ...dbOptions = {}
                } = options;

                return this.readDB(useLiveDB).get(id, dbOptions).then(({ _id, ...data }) => {
                    this._id = _id;
                    return Promise.resolve(this._data = data);
                }).catch((error) => {
                    if (useLiveDB && error.status === 0 && error.name === "unknown") {
                        this.liveDBOffline = true;
                        return this.load(id, dbOptions, true);
                    }
                    else
                        throw error;
                });
            }
            catch (err) {
                console.error("model catch", err);
                return Promise.reject(err);
            }
        }
        else
            return Promise.reject(new Error(`No document "id" provided to load the data.`));
    }

    async save(values, { useLiveDB = false, autoIncrement = false, validate = false, hasChanges = false } = {}) {
        try {
            const { id, rev, attachments, ...docValues } = values;
            if (id)
                this.set("_id", id);
            if (rev)
                this.set("_rev", rev);

            if (!this._id) { //CREATE
                let idValue;
                if (useLiveDB && autoIncrement) {
                    idValue = await this.readDB(true).get("autoincrements").then((result) => {
                        const incrementedValue = parseInt(result[this._resource] || 0, 10) + 1;
                        result[this._resource] = incrementedValue;
                        return this.writeDB(true).put(result).then((response) => {
                            return Promise.resolve(incrementedValue);
                        });
                    })
                }
                this.setID(idValue);
                this._hasChanged = true;
            } else if (!this._data._rev) {//on EDIT
                throw new Error('The "_rev" field is required when editing an existing document.');
            }

            if (attachments)
                this.addAttachments(attachments);

            //ADD THE ABOVE LOGIC BEFORE SCHEMA MAPPING IN-ORDER TO HAVE 
            //THEM IN THE MODEL INSTANCE FOR MULTIPLE SAVES
            let docData = this.data(docValues, validate);

            if (this._hasChanged || hasChanges) {
                docData['_id'] = this._id;
                return this.writeDB(useLiveDB).put(docData);
            } else {
                return Promise.resolve(docData);
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    destroy(useLiveDB = false, options = {}) {
        return this.writeDB(useLiveDB).remove({ _id: this._data._id, _rev: this._data._rev }, options).then((result) => {
            this._id = null;
            this._data = {};
            return Promise.resolve(result);
        });
    }

    /**********************************
     * STATIC METHODS
     *********************************/
    static resource() {
        return this.RESOURCE || this.name.toLowerCase();
    }

    static getDB(mode = 'SYNC') {//LIVE = write online only, SYNC = read/write offline and sync later
        return mode === 'SYNC' ? this.DB || db : this.LIVE_DB;
    }

    static async load(id, options, raw = false, constructorParams) {
        let instance = new this(constructorParams);

        if (id && id !== 'create')
            await instance.load(id, options, raw);

        return Promise.resolve(instance);
    }

    static async loadForSelect(props = {}) {
        const {
            valueField,//Default: row _id
            labelField = "name",
            valueKey = 'id',
            labelKey = 'name',
            includeDoc = false,
            //...otherProps
        } = props;

        let output = [];
        const result = await this.all();
        const count = result.rows.length;
        for (let i = 0; i < count; i++) {
            //TODO: conditions for filtering out i.e. disabled or deleted records
            output.push(
                {
                    [valueKey]: valueField ? result.rows[i].doc[valueField] : result.rows[i].id,
                    [labelKey]: result.rows[i].doc[labelField],
                    doc: includeDoc ? result.rows[i].doc : null
                }
            )
        }

        return Promise.resolve(output);
    }

    static url(param = "") {
        if (param) {
            let resoucePos = param.indexOf(formatID(this.resource()));
            if (resoucePos === 0)
                param = param.substring(this.resource().length + 1);

            param = "/" + param;
        }

        return "/" + this.resource() + param;
    }

    static schemaFields(override) {
        if (this.SCHEMA && this.SCHEMA.fields)
            return { ...this.SCHEMA.fields, ...override };
        return override;
    }

    static async all(idOrIds = null) {
        var opts = {
            include_docs: true
        };

        if (idOrIds === null) {
            // get everything for this resouce
            opts.startkey = formatID(this.resource());
            opts.endkey = formatID(this.resource(), '\uffff');
        } else if (Array.isArray(idOrIds)) {
            // find multiple by ids
            opts.keys = idOrIds.map(function (id) {
                return formatID(this.resource(), id);
            });
        } else if (typeof idOrIds === 'object') {

            if (typeof idOrIds.startkey === 'undefined' || idOrIds.startkey === null)
                opts.startkey = formatID(this.resource());
            else
                opts.startkey = formatID(this.resource(), idOrIds.startkey);

            if (typeof idOrIds.endkey === 'undefined' || idOrIds.endkey === null)
                opts.endkey = formatID(this.resource(), '\uffff');
            else
                opts.endkey = formatID(this.resource(), idOrIds.endkey);

            if (idOrIds.descending === true)
                opts.descending = true;

            //https://pouchdb.com/2014/04/14/pagination-strategies-with-pouchdb.html
            if (idOrIds.limit)
                opts.limit = idOrIds.limit;

            if (typeof idOrIds.skip !== 'undefined' && idOrIds.skip !== null)
                opts.skip = idOrIds.skip;

        } else {
            // find by single id
            opts.key = formatID(this.resource(), idOrIds);
        }

        return await this.getDB().allDocs(opts);
    }

    static revisions() {
        this.getDB().get('mydoc').then(function (doc) {
            // handle doc
        }).catch(function (err) {
            console.log(err);
        });
    }

    static remove(doc) {
        const id = doc._id || formatID(this.resource(), doc.id);
        const rev = doc._rev || doc.rev;

        if (!id || !rev)
            throw new Error('To delete a document the "id" and "rev" properties are required.');

        return this.getDB().put({
            _id: id,
            _rev: rev,
            _deleted: true
        });
    }

    //true = deleted, false = exists, null = not in database
    static isDeleted(id) {
        return this.getDB().get(formatID(this.resource(), id))
            .then(function (doc) { return !!doc._deleted; })
            .catch(function (err) { return err.reason === "deleted" ? true : null; });
    }
}

//http://docs.couchdb.org/en/latest/ddocs/views/collation.html#collation-specification
// checkout \uffff as the end key
export const formatID = function (resource, uniqueIdentifier = '') {//id is usually timestamp
    resource = resource.replace('_', '');//removing any underscore is required to be safe when searching

    return resource + '_' + uniqueIdentifier;
}

export const generateTimestamp = function () {
    return (new Date().toJSON());//for extra safety add a random number after miliseconds// + (Math.floor(Math.random() * (999 - 100)) + 100);
}


/*mode: match|extract|extend //match mode: if it should through an error it doesn't validate all the fields
    match:      extract and validate all matching fields
    extract:    extract matching fields, no validation
    extend:     flexible structure, no-auto validation
*/
export const mapFieldsToSchema = function (schema, input, output, mode, validate, hasChanged = false) {
    if (mode === 'match' || validate) {
        const runner = new Validator(input, schema);//errorMessages
        //runner.setAttributeNames(attributeNames);
        if (runner.fails())
            return { schemaValidationErrors: runner.errors.errors };
    }


    for (let field in input) {
        if ((mode === 'extend' || schema.hasOwnProperty(field)) && input[field]) {//schema.hasOwnProperty(field) means mode is "extract"
            if (isObject(schema[field])) {
                output[field] = mapFieldsToSchema(schema[field], input[field], output[field] || {}, mode, validate, hasChanged);
            } else if (isArray(schema[field])) {
                output[field] = [];
                const length = input[field].length;
                for (let i = 0; i < length; i++) {
                    let arrayItemOutput = {};
                    mapFieldsToSchema(schema[field][0], input[field][i], arrayItemOutput, mode, validate, hasChanged);
                    output[field].push(arrayItemOutput);
                }
            } else {
                if (hasChanged === false && output[field] !== input[field]) {
                    hasChanged = true;
                }

                output[field] = input[field];
            }
        }
    }

    return { data: output, hasChanged };
}

export const isObject = function (value) {
    return value && typeof value === 'object' && value.constructor === Object;
};

export const isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};