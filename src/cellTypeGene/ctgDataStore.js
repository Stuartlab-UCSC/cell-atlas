
// Store the gene table data and handle all updates to it.

const defaultColumns = []
const defaultData = []
const defaultDisplay = []
const defaultAvailableCount = 0

class DataStore {
    constructor(columns, data, display, availableCount) {
        this.table = {
            columns, // metadata about the columns
            data,    // all of the data received from the server
            display, // those rows to be displayed on one page
            availableCount, // the count of available rows for display
        }
    }

    get() {
        return this.table
    }
    
    getAvailableCount() {
        return this.table.availableCount
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
    
    setAvailableCount(count) {
        this.table.availableCount = count
    }
    
    setColumnOptions(colIndex, options) {
        this.table.columns[colIndex].options = options
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
    
    updateColumnOption(colIndex, name, value) {
        this.table.columns[colIndex].options[name] = value
    }
    
}

let dataStore = new DataStore(
    defaultColumns, defaultData, defaultDisplay, defaultAvailableCount)

export default dataStore
