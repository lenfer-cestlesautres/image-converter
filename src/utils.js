const byteConverter = ( bytes, decimals, only) => {
    const K_UNIT = 1024;
    const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  
    if (bytes === 0) return "0 Byte";
  
    if (only === "MB") return (bytes / (K_UNIT*K_UNIT)).toFixed(decimals) + " MB" ;
  
    const i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
    const resp = parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];
  
    return resp;
  }
  
 export const addElementToATable = (sizes = []) => {
    const rowHead = document.getElementById('RowHead')
    const tableBody = document.getElementById('TableBody')
    const rowBody = document.getElementById('RowBody')
    const newRow = rowBody.cloneNode()
    for (const size of sizes) {
      const cell = rowHead.firstChild.cloneNode()
  
      cell.scope = 'row'
      cell.style.border = 'none'
      cell.textContent = byteConverter(size, 3, 'KB')
  
      newRow.appendChild(cell)
    }
    tableBody.appendChild(newRow)
  }