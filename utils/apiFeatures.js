class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'fields', 'page', 'sort'];
    excludedFields.forEach(field => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/, match => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {}

  limitFields() {}

  paginate() {}
}

module.exports = APIFeatures;
