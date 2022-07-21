export default {
  format_date: (date:Date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  }
};
