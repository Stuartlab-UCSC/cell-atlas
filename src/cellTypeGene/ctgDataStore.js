
// Store the gene table data and handle all updates to it.

const defaultColumns = []
const defaultData = []

class DataStore {
    constructor(columns, data) {
        this.tableData = {
            columns,
            data,
        }
    }

    get() {
        return this.tableData
    }
    
    getData() {
        return this.tableData.data
    }
    
    load(columns, data) {
        this.tableData = {
            columns,
            data,
        }
    }

    setDefaults() {
        this.tableData = {
            columns: defaultColumns,
            data: defaultData,
        }
    }
}

let dataStore = new DataStore(defaultColumns, defaultData)

export default dataStore
