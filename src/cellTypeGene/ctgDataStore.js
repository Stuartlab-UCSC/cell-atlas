
// Store the gene table data and handle all updates to it.

const defaultColumns = []
const defaultData = []
const defaultDisplay = []

class DataStore {
    constructor(columns, data, display) {
        this.table = {
            columns, // metadata about the columns
            data,    // all of the data received from the server
            display, // those rows to be displayed on one page
        }
    }

    get() {
        return this.table
    }
    
    getCount() {
        return (this.table && this.table.display)
            ? this.table.display.length
            : 0
    }
    
    getData() {
        return this.table.data
    }
    
    getDisplay() {
        return this.table.display
    }
    
    load(columns, data) {
        this.table = {
            columns,
            data,
        }
    }

    setDefaults() {
        this.table = {
            columns: defaultColumns,
            data: defaultData,
            display: defaultDisplay,
        }
    }
    
    setDisplay(display) {
        this.table.display = display
    }
    
}

let dataStore = new DataStore(defaultColumns, defaultData, defaultDisplay)

export default dataStore
