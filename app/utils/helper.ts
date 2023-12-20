const formatDateString = (dateString:string)=> {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US');
    return formattedDate;
}

export default formatDateString;