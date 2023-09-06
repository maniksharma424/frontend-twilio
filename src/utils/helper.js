export const convertIsoToPlainDateTime = (isoTimestamp)=> {
    const dateObject = new Date(isoTimestamp);
  
    // Extract date components
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
  
    // Extract time components
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');
    const milliseconds = String(dateObject.getMilliseconds()).padStart(3, '0');
  
    // Construct the plain date and time format
    const plainDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  
    return plainDateTime;
  }
  

  