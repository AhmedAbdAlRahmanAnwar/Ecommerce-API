module.exports = async (collection, page = 1) => {
    const pageSize = 12;
    const documentsCount = await collection.countDocuments();
    const numberOfPages = Math.ceil(documentsCount / pageSize) || 1;
    let pageNumber = parseInt(page) ? Math.max(parseInt(page), 1) : 1;
    // pageNumber = pageNumber > numberOfPages ? numberOfPages : pageNumber;
    return {pageNumber, pageSize, numberOfPages};
}